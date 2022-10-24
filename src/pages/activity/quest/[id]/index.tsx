import axios from 'axios'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLiff } from 'react-liff'
import useSWR from 'swr/immutable'
import Button from '~/components/Button'
import type { IQuestion } from '~/const/activity/questions'
import LoadingWrapper from '~/layouts/LoadingWrapper'
import Wrapper from '~/layouts/Wrapper'
import { renderAnswerFromQuestion } from '~/modules/activity'
import Header from '~/routes/Activity/components/Header'
import type { ApiResponseError, ApiResponseSuccess } from '~/types/api'
import { fetcher } from '~/utils'
import { strSubstitute } from '~/utils/string'

export const getServerSideProps: GetServerSideProps = async ({
  locale = 'th',
}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'activity'])),
  },
})

const Page: NextPage = () => {
  const { register, watch, handleSubmit, setValue } = useForm()
  const { query, push, locale } = useRouter()
  const { liff, isReady } = useLiff()
  const { t } = useTranslation(['common', 'activity'])

  const { data, error } = useSWR<
    ApiResponseSuccess<IQuestion>,
    ApiResponseError
  >(
    query.id && locale
      ? {
          method: 'GET',
          url: `/api/v1/activity/quest?questNo=${query.id}&lang=${locale}`,
        }
      : null,
    fetcher
  )

  useEffect(() => {
    if (data) {
      setValue('questNo', data.payload.questNo)
      setValue('questionId', data.payload.id)
    }
  }, [data?.payload])

  if (error) {
    return <div>failed to load</div>
  }

  if (!data || !isReady) {
    return <LoadingWrapper />
  }

  return (
    <Wrapper className="px-5 py-10">
      <div className="mx-auto max-w-screen-md">
        <Header />
        <div className="my-8 text-center font-heading">
          <h2 className="mb-2 text-xl font-normal">
            {strSubstitute(
              t('QUEST_NUMBER_TITLE', { ns: 'activity' }),
              data.payload.questNo
            )}
          </h2>
          <h1 className="text-3xl font-bold">{data.payload.questTitle}</h1>
        </div>

        <form
          onSubmit={handleSubmit(async (d) => {
            console.log(d)

            const {
              data: { payload },
            } = await axios.post('/api/v1/activity/quest/submit', d, {
              headers: {
                Authorization: liff.getIDToken()
                  ? `Bearer ${liff.getIDToken()}`
                  : undefined,
              },
            })

            if (payload.result) {
              push({
                pathname: '/activity/quest/[id]/correct',
                query: {
                  ...query,
                },
              })
            } else {
              push({
                pathname: '/activity/quest/[id]/incorrect',
                query: {
                  ...query,
                },
              })
            }
          })}
        >
          <input type="hidden" {...register('questNo')} />
          <input type="hidden" {...register('questionId')} />
          <div className="my-10">
            <div className="mb-1 font-heading font-bold">
              {t('QUEST_QUESTION.QUESTION_SECTION_TITLE', { ns: 'activity' })}
            </div>
            <p>{data.payload.questions}</p>
          </div>

          <div className="my-10">
            <div className="mb-1 font-heading font-bold">
              {t('QUEST_QUESTION.ANSWER_SECTION_TITLE', { ns: 'activity' })}
            </div>
            {renderAnswerFromQuestion(data.payload, register, watch)}
          </div>

          <div className="my-10 flex justify-between gap-5">
            {liff.isInClient?.() && (
              <Button
                label={t('BUTTON_LABEL.CLOSE', { ns: 'common' })}
                variant="primary"
                className="w-full max-w-[264px]"
                onClick={() => {
                  liff.closeWindow()
                }}
              />
            )}
            <Button
              type="submit"
              label={t('QUEST_QUESTION.SUBMIT_ANSWER_BUTTON', {
                ns: 'activity',
              })}
              variant="ictTurquoise"
              className="mx-auto w-full max-w-[264px]"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

export default Page

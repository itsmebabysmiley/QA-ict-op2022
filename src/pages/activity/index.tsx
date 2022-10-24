import type { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useLiff } from 'react-liff'
import useSWR from 'swr/immutable'
import Button from '~/components/Button'
import LoadingWrapper from '~/layouts/LoadingWrapper'
import Wrapper from '~/layouts/Wrapper'
import Header from '~/routes/Activity/components/Header'
import ActivityCardGrid from '~/routes/Activity/containers/ActivityCardGrid'
import type { ApiResponseSuccess } from '~/types/api'
import { QUEST_STATUS } from '~/types/api/activity'
import type { IMeProfilePayload } from '~/types/api/me'
import { fetcher } from '~/utils'

interface IQuestList {
  icon: string
  title: string
  success?: boolean
}

const QUEST_LIST: (IQuestList & { questNo: number })[] = [
  { questNo: 1, icon: 'op2022:app-registration', title: 'Check in' },
  { questNo: 2, icon: 'op2022:modern-mic', title: 'Meet & Greet' },
  {
    questNo: 3,
    icon: 'op2022:earth',
    title: 'Intl. Experiences',
  },
  { questNo: 4, icon: 'op2022:chalkboard-teacher', title: 'Guidance' },
  { questNo: 5, icon: 'op2022:text-snippet', title: 'Innovative Project' },
  { questNo: 6, icon: 'op2022:star-half', title: 'Evaluation' },
]

export const getServerSideProps: GetServerSideProps = async ({
  locale = 'th',
}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'activity'])),
  },
})

const Page: NextPage = () => {
  const { push } = useRouter()
  const { t } = useTranslation(['common', 'activity'])
  const { liff, isReady } = useLiff()
  const { data } = useSWR<ApiResponseSuccess<IMeProfilePayload>>(
    isReady
      ? {
          method: 'GET',
          url: '/api/v1/me',
          token: liff?.getIDToken?.() ? liff.getIDToken() : undefined,
        }
      : null,
    fetcher
  )

  const questProgress = useMemo<Record<string, IQuestList>>(() => {
    return QUEST_LIST.reduce((acc, { questNo, icon, title }) => {
      if (!data) {
        return acc
      }

      return {
        ...acc,
        [questNo]: {
          icon,
          title,
          success:
            data.payload.quests.find((q) => q.questNo === questNo)?.status ===
            QUEST_STATUS.SUCCESS_QUEST,
        },
      }
    }, {})
  }, [data?.payload?.quests])

  if (!data) {
    return <LoadingWrapper />
  }

  return (
    <Wrapper className="px-5 py-10">
      <div className="mx-auto max-w-screen-md">
        <Header />
        <div className="my-8 text-center font-heading">
          <h1 className="mb-2 text-3xl font-bold">
            {t('ACTIVITY_SUMMARY.TITLE', { ns: 'activity' })}
          </h1>
          <h2 className="text-xl font-bold">{data.payload.name}</h2>
        </div>
        <ActivityCardGrid activities={Object.values(questProgress)} />

        {Object.values(questProgress).every((q) => q.success) && (
          <div className="my-10">
            <Button
              label={t('ACTIVITY_SUMMARY.REWARD_BUTTON', { ns: 'activity' })}
              variant="ictTurquoise"
              className="w-full"
              onClick={() => {
                push('/activity/claim')
              }}
            />
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default Page

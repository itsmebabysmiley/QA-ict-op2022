import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Button from '~/components/Button'
import { EvaluationHeaderWordmark } from '~/components/Icons'
import { Evaluation_EN } from '~/const/evaluation/evaluationForm'
import { useStoreon } from '~/context/storeon'
import Wrapper from '~/layouts/Wrapper'
import { FormBuilder } from '~/modules/form/formBuilder'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['evaluation'])),
  },
})

const Page: NextPage = () => {
  const { t } = useTranslation('evaluation')
  const { push } = useRouter()
  const { form, dispatch } = useStoreon('form')
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: form.evaluation,
  })

  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-8 py-10 sm:justify-center">
        <form
          onSubmit={handleSubmit((data) => {
            dispatch('form/evaluation/setFields', data)
            push('/evaluation/others')
          })}
        >
          <div className="rounded-xl sm:bg-white sm:p-16 sm:text-black">
            <EvaluationHeaderWordmark className="mb-6 text-white sm:text-black" />
            <FormBuilder
              form={Evaluation_EN[1]}
              register={register}
              watch={watch}
              i18n={t}
            />
          </div>
          <div className="mt-10 text-right">
            <Button
              type="submit"
              label={t('BUTTON_LABEL.NEXT')}
              variant="ictTurquoise"
              className="w-32"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

export default Page

import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Button from '~/components/Button'
import { useStoreon } from '~/context/storeon'
import Wrapper from '~/layouts/Wrapper'
import TextBox from '~/routes/Register/components/TextBox'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'register'])),
  },
})

const Page: NextPage = () => {
  const { t } = useTranslation('register')
  const { t: tCommon } = useTranslation('common')
  const { push } = useRouter()
  const { dispatch } = useStoreon('form')

  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-8 py-10 sm:justify-center">
        <div className="rounded-xl sm:bg-white sm:p-16 sm:text-black">
          <h1 className="mb-4 text-center font-heading text-3xl font-bold">
            {t('REG_FORM.POLICY.TITLE')}
          </h1>
          <TextBox text={t('REG_FORM.POLICY.CONTENT')} />
        </div>
        <div className="mt-10 flex justify-between gap-5">
          <Button
            label={tCommon('BUTTON_LABEL.BACK')}
            variant="primary"
            className="w-full sm:w-32"
            onClick={() => {
              dispatch('form/register/prevStep')
              push('/register/type')
            }}
          />
          <Button
            type="button"
            label={t('REG_FORM.REG_BUTTON_ACCEPT')}
            variant="ictTurquoise"
            className="w-full sm:w-32"
            onClick={() => {
              dispatch('form/register/setFields', {
                policyAgreement: true,
              })
              dispatch('form/register/nextStep')
              push('/register/info')
            }}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default Page

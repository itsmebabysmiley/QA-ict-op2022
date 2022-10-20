import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import RegistrantTypes from '~/const/register/registrantType'
import Wrapper from '~/layouts/Wrapper'
import RegistrantTypeButton from '~/routes/Register/components/RegistrantTypeButton'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'th', ['register'])),
  },
})

const Page = () => {
  const { push } = useRouter()
  const { t } = useTranslation('register')

  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col items-center justify-center px-8 py-10">
        <div className="mb-10 text-center font-heading text-4xl font-bold">
          <div>{t('REG_TYPE_SELECTION_TITLE')}</div>
        </div>

        <div className="grid w-full grid-cols-[repeat(3,_minmax(100px,_1fr))] justify-between gap-3 sm:grid-cols-3 sm:gap-6">
          {RegistrantTypes.map((type, i) => (
            <RegistrantTypeButton
              key={type.type}
              icon={type.icon}
              label={t(type.label)}
              variant={i % 2 === 0 ? 'primary' : 'secondary'}
              className="cursor-pointer"
              onClick={() => push(`/register/info?type=${type.type}`)}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

export default Page

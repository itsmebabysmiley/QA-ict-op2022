import type { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Button from '~/components/Button'
import { IctMahidolOpenHouseWordmark } from '~/components/Icons'
import { useLiff } from '~/context/liff/LIFFProvider'
import { useStoreon } from '~/context/storeon'
import Wrapper, { BG_VARIANT_TYPES } from '~/layouts/Wrapper'

export const getServerSideProps: GetServerSideProps = async ({
  locale = 'th',
}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'evaluation'])),
  },
})

const Page = () => {
  const { liff, isReady } = useLiff()
  const { push } = useRouter()
  const { dispatch } = useStoreon('form')
  const { t } = useTranslation(['common', 'evaluation'])

  return (
    <Wrapper variant={BG_VARIANT_TYPES.LANDING}>
      <div className="mx-auto flex min-h-screen max-w-screen-sm flex-col items-center justify-center px-8">
        <IctMahidolOpenHouseWordmark className="mb-10 w-full" />

        <div className="mb-6 space-y-5 text-center font-heading">
          <div className="text-3xl font-bold">
            {t('EVALUATION_TITLE', { ns: 'evaluation' })}
          </div>
          <div>{t('EVALUATION_DESCRIPTION', { ns: 'evaluation' })}</div>
        </div>

        <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-6">
          <Button
            label={t('START_EVAL_BUTTON', { ns: 'evaluation' })}
            variant="ictTurquoise"
            className="mx-auto w-full sm:w-1/2"
            onClick={() => {
              push('/evaluation/general')
            }}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default Page

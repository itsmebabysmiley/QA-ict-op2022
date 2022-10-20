import dayjs from 'dayjs'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Button from '~/components/Button'
import DateInput from '~/components/Input/DateInput'
import TextInput from '~/components/Input/TextInput'
import Wrapper from '~/layouts/Wrapper'
import FormHeader from '~/routes/Register/components/FormHeader'
import { strSubstitute } from '~/utils/formatter'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['register'])),
  },
})

const Page: NextPage = () => {
  const { t } = useTranslation('register')
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-8 py-10 sm:justify-center">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data)
            push('/register/additional')
          })}
        >
          <div className="rounded-xl sm:bg-white sm:p-16 sm:text-black">
            <div className="mb-10 w-full">
              <FormHeader
                title={t('REG_FORM.REG_FORM_TITLE')}
                section={strSubstitute(
                  t('REG_FORM.REG_SECTION_TEMPLATE'),
                  '1',
                  t('REG_FORM.REG_SECTION_BASIC_INFO')
                )}
              />
            </div>

            <div className="w-full space-y-5">
              <TextInput
                id="firstName"
                label={t('REG_FORM.REG_FIELD_FIRSTNAME')}
                placeholder={t('REG_FORM.REG_FIELD_FIRSTNAME_PLACEHOLDER')}
                required
                className="w-full"
                {...register('firstName', { required: true })}
              />
              <TextInput
                id="lastName"
                label={t('REG_FORM.REG_FIELD_LASTNAME')}
                placeholder={t('REG_FORM.REG_FIELD_LASTNAME_PLACEHOLDER')}
                required
                className="w-full"
                {...register('lastName', { required: true })}
              />
              <DateInput
                id="dob"
                label={t('REG_FORM.REG_FIELD_DOB')}
                required
                className="w-full"
                {...register('dob', {
                  required: true,
                  valueAsDate: true,
                  value: dayjs().subtract(18, 'year').format('YYYY-MM-DD'),
                })}
              />
              <TextInput
                id="email"
                label={t('REG_FORM.REG_FIELD_EMAIL')}
                placeholder={t('REG_FORM.REG_FIELD_EMAIL_PLACEHOLDER')}
                required
                className="w-full"
                {...register('email', { required: true })}
              />
              <TextInput
                id="phone"
                label={t('REG_FORM.REG_FIELD_PHONE')}
                placeholder={t('REG_FORM.REG_FIELD_PHONE_PLACEHOLDER')}
                required
                className="w-full"
                {...register('phone', { required: true })}
              />
            </div>
          </div>
          <div className="mt-10 text-right">
            <Button
              type="submit"
              label={t('REG_FORM.REG_BUTTON_NEXT')}
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

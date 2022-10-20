import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import Button from '~/components/Button'
import SelectInput from '~/components/Input/SelectInput'
import TextInput from '~/components/Input/TextInput'
import EduLevels from '~/const/register/eduLevel'
import Provinces from '~/const/register/province'
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
  const { push, locale = 'th' } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const provincesList = useMemo(() => {
    const provinceSorted =
      locale === 'th'
        ? Provinces
        : Provinces.sort((a, b) => {
            if (a.province_id === 1) {
              return -1
            }

            return a.name.en.localeCompare(b.name.en)
          })

    return provinceSorted.map((p) => ({
      value: `${p.province_id}`,
      label: p.name[locale as 'th' | 'en'],
    }))
  }, [])

  const educationList = useMemo(() => {
    return EduLevels.map((e) => ({
      value: `${e.id}`,
      label: e.label[locale as 'th' | 'en'],
    }))
  }, [])

  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-8 py-10 sm:justify-center">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data)
            push('/register/success')
          })}
        >
          <div className="rounded-xl sm:bg-white sm:p-16 sm:text-black">
            <div className="mb-10 w-full">
              <FormHeader
                title={t('REG_FORM.REG_FORM_TITLE')}
                section={strSubstitute(
                  t('REG_FORM.REG_SECTION_TEMPLATE'),
                  '2',
                  t('REG_FORM.REG_SECTION_ADDITIONAL')
                )}
              />
            </div>

            <div className="w-full space-y-5">
              <SelectInput
                id="province"
                label={t('REG_FORM.REG_FIELD_PROVINCE')}
                required
                className="w-full capitalize"
                options={provincesList}
                {...register('province', { required: true })}
              />
              <TextInput
                id="school"
                label={t('REG_FORM.REG_FIELD_SCHOOL')}
                placeholder={t('REG_FORM.REG_FIELD_SCHOOL_PLACEHOLDER')}
                required
                className="w-full"
                {...register('lastName', { required: true })}
              />
              <SelectInput
                id="level"
                label={t('REG_FORM.REG_FIELD_SCHOOL_LEVEL')}
                required
                className="w-full"
                options={educationList}
                {...register('level', { required: true })}
              />
            </div>
          </div>
          <div className="mt-10 text-center">
            <Button
              type="submit"
              label={t('REG_FORM.REG_BUTTON_SUBMIT')}
              variant="ictTurquoise"
              className="w-full sm:w-32"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

export default Page

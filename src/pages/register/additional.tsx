import axios from 'axios'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useLiff } from 'react-liff'
import Button from '~/components/Button'
import SelectInput from '~/components/Input/SelectInput'
import TextInput from '~/components/Input/TextInput'
import EduLevels from '~/const/register/eduLevel'
import Provinces from '~/const/register/province'
import { useStoreon } from '~/context/storeon'
import Wrapper from '~/layouts/Wrapper'
import FormHeader from '~/routes/Register/components/FormHeader'
import { strSubstitute } from '~/utils/string'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['register'])),
  },
})

const Page: NextPage = () => {
  const { liff } = useLiff()
  const { t } = useTranslation('register')
  const { push, locale = 'th' } = useRouter()
  const { form, dispatch } = useStoreon('form')

  const isEduRequired = useMemo(() => {
    return ['student', 'uni_student', 'teacher'].includes(
      form.register.fields?.regType || ''
    )
  }, [form.register.fields?.regType])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      province: form.register.fields?.province || undefined,
      school: isEduRequired ? form.register.fields?.school || '' : undefined,
      educationLevel: isEduRequired
        ? form.register.fields?.educationLevel || undefined
        : undefined,
    },
  })

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
          onSubmit={handleSubmit(async (data) => {
            console.log(data)
            dispatch('form/register/setFields', {
              province: data.province,
              school: data.school,
              educationLevel: data.educationLevel,
            })

            console.log(form.register.fields)

            const liffIdToken = liff.getIDToken() || undefined

            const { data: r } = await axios.post(
              '/api/v1/register',
              {
                ...form.register.fields,
                ...data,
              },
              {
                headers: {
                  authorization: liffIdToken
                    ? `Bearer ${liffIdToken}`
                    : undefined,
                },
              }
            )

            console.log(r)

            dispatch('form/register/nextStep')
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
              {isEduRequired && (
                <TextInput
                  id="school"
                  label={t('REG_FORM.REG_FIELD_SCHOOL')}
                  placeholder={t('REG_FORM.REG_FIELD_SCHOOL_PLACEHOLDER')}
                  required
                  className="w-full"
                  {...register('school', { required: true })}
                />
              )}
              {isEduRequired && (
                <SelectInput
                  id="level"
                  label={t('REG_FORM.REG_FIELD_SCHOOL_LEVEL')}
                  required
                  className="w-full"
                  options={educationList}
                  {...register('educationLevel', { required: true })}
                />
              )}
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

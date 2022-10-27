import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Button from '~/components/Button'
import { useStoreon } from '~/context/storeon'
import Wrapper from '~/layouts/Wrapper'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'register'])),
  },
})

const schema = Joi.object({
  policyAgreement: Joi.boolean().invalid(false).required(),
})

const Page: NextPage = () => {
  const { t } = useTranslation('register')
  const { t: tCommon } = useTranslation('common')
  const { push } = useRouter()
  const { form, dispatch } = useStoreon('form')
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      policyAgreement: form.register.fields?.policyAgreement || false,
    },
  })

  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-8 py-10 sm:justify-center">
        <form
          onSubmit={handleSubmit((data) => {
            dispatch('form/register/setFields', data)
            dispatch('form/register/nextStep')
            push('/register/info')
          })}
        >
          <div className="rounded-xl sm:bg-white sm:p-16 sm:text-black">
            <h1 className="mb-4 text-center font-heading text-3xl font-bold">
              {t('REG_FORM.POLICY.TITLE')}
            </h1>
            <div className="min-h-[24rem] space-y-5 overflow-hidden rounded-xl bg-white p-10 text-black shadow-lg sm:p-5 sm:shadow-none">
              <div>
                <h3 className="mb-2 font-heading font-bold">
                  การให้สิทธิ์กับเจ้าของข้อมูลส่วนบุคคล
                </h3>
                <ol className="list-inside list-disc">
                  <li>
                    คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยมหิดล
                    จะเก็บรวบรวมข้อมูลส่วนบุคคลของผู้ใช้บริการของคณะฯ
                    เท่าที่จำเป็น ได้แก่{' '}
                    <span className="font-bold text-dst-prussian-blue">
                      ชื่อ นามสกุล อีเมล หมายเลขโทรศัพท์ จังหวัดทีอยู่อาศัย
                      ชื่อสถานศึกษาและระดับการศึกษา เป็นต้น
                    </span>{' '}
                    โดยขึ้นอยู่กับประเภทของการรับบริการที่ท่านใช้ผ่านเว็บไซต์ของคณะฯ
                  </li>
                  <li>
                    การลงทะเบียนสมัครเข้าร่วมกิจกรรม ที่ทำผ่านเว็บไซต์ ภายใต้
                    Domain name “ict.mahidol.ac.th” ของคณะฯ
                  </li>
                  <li>
                    คณะฯ จะใช้ข้อมูลส่วนบุคคลของท่านเพื่อประโยชน์ในการให้บริการ
                    และการดำเนินการตามวัตถุประสงค์และภารกิจของคณะฯ
                    ภายใต้ขอบเขตของกฎหมายที่เกี่ยวข้อง
                    รวมถึงรับทราบข่าวสารกิจกรรมของคณะฯ
                  </li>
                  <li>
                    <span className="font-bold text-dst-prussian-blue">
                      คณะฯ จะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านแก่บุคคลที่สาม
                    </span>{' '}
                    เพื่อนำไปใช้ในการดำเนินกิจกรรมที่ไม่เกี่ยวข้อง
                    เว้นแต่จะได้รับความยินยอมจากเจ้าของข้อมูล
                    หรือเป็นกรณีที่มีกฎหมายกำหนดให้กระทำได้เท่านั้น
                  </li>
                  <li>
                    หากท่านประสงค์เปลี่ยนแปลงหรือแก้ไขข้อมูลส่วนบุคคล
                    สามารถส่งข้อมูลที่ท่านต้องการแก้ไข
                    รวมถึงประสงค์จะขอลบข้อมูลส่วนบุคคลมาที่อีเมล์{' '}
                    <a href="mailto:tanakorn.kan@mahidol.ac.th">
                      tanakorn.kan@mahidol.ac.th
                    </a>{' '}
                    หรือ{' '}
                    <a href="mailto:prach.cha@mahidol.ac.th">
                      prach.cha@mahidol.ac.th
                    </a>
                  </li>
                </ol>
              </div>

              <div className="bg-dst-sunglow/20 p-5">
                <h3 className="mb-2 text-center font-heading font-bold">
                  ในระหว่างกิจกรรม ICT Mahidol Open House
                </h3>
                <ol className="list-inside list-disc">
                  <li>
                    จะมีการบันทึกภาพ เสียง คลิปเพื่อเผยแพร่ภาพถ่าย วิดีโอ
                    เนื้อหา ข้อมูลต่าง ๆ บนเว็บไซต์ บนอินเตอร์เน็ต
                    กระดาษข่าวอื่น ๆ ในที่สาธารณะ หรือตามสถานที่ใดๆ เพื่อเป็น
                    สื่อกลาง
                    ในการสื่อสารกับสังคมและเป็นประโยชน์ต่อการศึกษาเท่านั้น
                  </li>
                  <li>
                    ข้อมูลส่วนบุคคลจะถูกเก็บรักษาไว้เป็นความลับจนกว่าการดำเนินงานตามวัตถุประสงค์ของคณะเทคโนโลยีสารสนเทศและการสื่อสาร
                    มหาวิทยาลัยมหิดลสิ้นสุดลง
                  </li>
                </ol>
              </div>

              <div>
                <div>
                  <input
                    type="checkbox"
                    className="mr-2"
                    id="policyAgreement"
                    {...register('policyAgreement')}
                  />
                  <label htmlFor="policyAgreement">
                    ข้าพเจ้าได้อ่านและเข้าใจข้อกำหนดและเงื่อนไขในการเปิดเผยข้อมูลส่วนบุคคลซึ่งระบุไว้ด้านบนนี้อย่างชัดเจนแล้ว
                  </label>
                </div>
                {errors.policyAgreement?.message ? (
                  <div className="text-sm text-red-500">
                    กรุณายอมรับข้อกำหนดและเงื่อนไขในการเปิดเผยข้อมูลส่วนบุคคล
                  </div>
                ) : null}
              </div>
              <div>
                ท่านสามารถดูรายละเอียดเพิ่มเติมได้ที่ &quot;
                <a
                  href="https://privacy.mahidol.ac.th/mu-privacy-policy-th/"
                  target="_blank"
                  className="text-ict-magenta-process hover:underline"
                  rel="noreferrer"
                >
                  ประกาศนโยบายการคุ้มครองส่วนบุคคล
                </a>
                &quot;
              </div>
            </div>
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
              type="submit"
              label={t('REG_FORM.REG_BUTTON_NEXT')}
              variant="ictTurquoise"
              className="w-full sm:w-32"
              disabled={watch('policyAgreement') === false}
            />
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

export default Page

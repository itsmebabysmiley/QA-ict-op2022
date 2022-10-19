import Wrapper from '~/layouts/Wrapper'
import RegistrantTypeButton from '~/routes/Register/components/RegistrantTypeButton'

const Page = () => {
  return (
    <Wrapper>
      <div className="mx-auto flex min-h-screen max-w-screen-md flex-col items-center px-8 py-10 sm:justify-center">
        <div className="mb-10 text-center font-heading text-4xl font-bold">
          <div>คุณคือใคร ?</div>
        </div>

        <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] justify-between gap-4 sm:gap-6">
          <RegistrantTypeButton
            icon="/static/images/types/type-icon-student.svg"
            label="นักเรียน"
            variant="primary"
          />
          <RegistrantTypeButton
            icon="/static/images/types/type-icon-college-student.svg"
            label="นักศึกษา"
            variant="secondary"
          />
          <RegistrantTypeButton
            icon="/static/images/types/type-icon-teacher.svg"
            label="อาจารย์"
            variant="primary"
          />
          <RegistrantTypeButton
            icon="/static/images/types/type-icon-parents.svg"
            label="ผู้ปกครอง"
            variant="secondary"
          />
          <RegistrantTypeButton
            icon="/static/images/types/type-icon-mu-staff.svg"
            label="บุคลากร ม.มหิดล"
            variant="primary"
          />
          <RegistrantTypeButton
            icon="/static/images/types/type-icon-external.svg"
            label="อื่น ๆ"
            variant="secondary"
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default Page

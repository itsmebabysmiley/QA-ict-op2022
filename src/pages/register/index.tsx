import { useRouter } from 'next/router'
import Button from '~/components/Button'
import { IctMahidolOpenHouseWordmark } from '~/components/Icons'
import Wrapper, { BG_VARIANT_TYPES } from '~/layouts/Wrapper'

const Page = () => {
  const { push } = useRouter()
  return (
    <Wrapper variant={BG_VARIANT_TYPES.LANDING}>
      <div className="mx-auto flex min-h-screen max-w-screen-sm flex-col items-center justify-center px-8">
        <IctMahidolOpenHouseWordmark className="mb-10 w-full" />

        <div className="mb-6 space-y-2 text-center font-heading text-xl">
          <div>Select Your Nationality</div>
          <div>เลือกสัญชาติสำหรับลงทะเบียน</div>
        </div>

        <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-6">
          <Button
            icon="op2022:flag-thailand"
            iconPosition="left"
            label="สัญชาติไทย"
            className="w-full sm:w-1/2"
            onClick={() => {
              push('/register/type', undefined, { locale: 'th' })
            }}
          />
          <Button
            icon="op2022:globe"
            iconPosition="left"
            label="International"
            className="w-full sm:w-1/2"
            onClick={() => {
              push('/register/type', undefined, { locale: 'en' })
            }}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default Page

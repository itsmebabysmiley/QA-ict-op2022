import Button from '~/components/Button'
import { IctMahidolOpenHouseWordmark } from '~/components/Icons'

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8">
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
        />
        <Button
          icon="op2022:globe"
          iconPosition="left"
          label="International"
          className="w-full sm:w-1/2"
        />
      </div>
    </div>
  )
}

export default Page

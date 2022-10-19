import DateInput from '~/components/Input/DateInput'
import TextInput from '~/components/Input/TextInput'

const Page = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-8 py-10 sm:justify-center">
      <div className="mb-10 w-full font-bold">
        <div className="mb-6 font-heading text-4xl">ลงทะเบียน</div>
        <div className="font-heading text-base">ส่วนที่ 1: ข้อมูลทั่วไป</div>
      </div>

      <div className="w-full space-y-5">
        <TextInput
          id="firstName"
          label="ชื่อ"
          placeholder="สตาร์"
          required
          className="w-full"
        />
        <TextInput
          id="lastName"
          label="นามสกุล"
          placeholder="สารสนเทศ"
          required
          className="w-full"
        />
        <DateInput
          id="dob"
          label="วัน/เดือน/ปี เกิด"
          required
          className="w-full"
        />
        <TextInput
          id="email"
          label="อีเมล"
          placeholder="nongstar@gmail.com"
          required
          className="w-full"
        />
        <TextInput
          id="email"
          label="เบอร์โทรศัพท์"
          placeholder="0812345678"
          required
          className="w-full"
        />
      </div>
    </div>
  )
}

export default Page

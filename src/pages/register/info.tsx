import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import Button from '~/components/Button'
import DateInput from '~/components/Input/DateInput'
import TextInput from '~/components/Input/TextInput'
import Wrapper from '~/layouts/Wrapper'
import FormHeader from '~/routes/Register/components/FormHeader'

const Page: NextPage = () => {
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
          })}
        >
          <div className="rounded-xl sm:bg-white sm:p-16 sm:text-black">
            <div className="mb-10 w-full">
              <FormHeader title="ลงทะเบียน" section="ส่วนที่ 1: ข้อมูลทั่วไป" />
            </div>

            <div className="w-full space-y-5">
              <TextInput
                id="firstName"
                label="ชื่อ"
                placeholder="สตาร์"
                required
                className="w-full"
                {...register('firstName', { required: true })}
              />
              <TextInput
                id="lastName"
                label="นามสกุล"
                placeholder="สารสนเทศ"
                required
                className="w-full"
                {...register('lastName', { required: true })}
              />
              <DateInput
                id="dob"
                label="วัน/เดือน/ปี เกิด"
                required
                className="w-full"
                {...register('dob', { required: true })}
              />
              <TextInput
                id="email"
                label="อีเมล"
                placeholder="nongstar@gmail.com"
                required
                className="w-full"
                {...register('email', { required: true })}
              />
              <TextInput
                id="phone"
                label="เบอร์โทรศัพท์"
                placeholder="0812345678"
                required
                className="w-full"
                {...register('phone', { required: true })}
              />
            </div>
          </div>
          <div className="mt-10 text-right">
            <Button
              type="submit"
              label="ต่อไป"
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

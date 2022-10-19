import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import Button from '~/components/Button'
import SelectInput from '~/components/Input/SelectInput'
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
              <FormHeader
                title="ลงทะเบียน"
                section="ส่วนที่ 2: ข้อมูลเพิ่มเติม"
              />
            </div>

            <div className="w-full space-y-5">
              <SelectInput
                id="province"
                label="จังหวัดที่อาศัยอยู่ปัจจุบัน"
                required
                className="w-full"
                options={[
                  { value: 'bangkok', label: 'กรุงเทพมหานคร' },
                  { value: 'nonthaburi', label: 'นนทบุรี' },
                ]}
                {...register('province', { required: true })}
              />
              <TextInput
                id="school"
                label="โรงเรียน/สถาบัน/มหาวิทยาลัย"
                placeholder="โรงเรียนน้องสตาร์วิทยาคม"
                required
                className="w-full"
                {...register('lastName', { required: true })}
              />
              <SelectInput
                id="level"
                label="ระดับชั้น"
                required
                className="w-full"
                options={[
                  { value: '1', label: 'มัธยมศึกษาปีที่ 1' },
                  { value: '2', label: 'มัธยมศึกษาปีที่ 2' },
                ]}
                {...register('level', { required: true })}
              />
            </div>
          </div>
          <div className="mt-10 text-center">
            <Button
              type="submit"
              label="ลงทะเบียน"
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

import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useLiff } from 'react-liff'
import Button from '~/components/Button'
import TextInput from '~/components/Input/TextInput'
import Wrapper from '~/layouts/Wrapper'
import Header from '~/routes/Activity/components/Header'
import ChoiceGroup from '~/routes/Activity/components/Input/ChoiceGroup'

const Page: NextPage = () => {
  const { register, watch, handleSubmit } = useForm()
  const { liff } = useLiff()

  return (
    <Wrapper className="px-5 py-10">
      <div className="mx-auto max-w-screen-md">
        <Header />
        <div className="my-8 text-center font-heading">
          <h2 className="mb-2 text-xl font-normal">จุดที่ 2</h2>
          <h1 className="text-3xl font-bold">Meet & Greet</h1>
        </div>

        <form
          onSubmit={handleSubmit((data) => {
            console.log(data)
          })}
        >
          <div className="my-10">
            <div className="mb-1 font-heading font-bold">คำถาม</div>
            <p>จำนวนชมรม (Club) ที่จัดแสดงมีกี่ชมรม</p>
          </div>

          <div className="my-10">
            <div className="mb-1 font-heading font-bold">คำตอบ</div>
            {/* <TextInput className="w-full" {...register('answer')} /> */}
            <ChoiceGroup
              name="radio-group"
              register={register}
              watch={watch}
              type="checkbox"
              options={[
                {
                  label: 'ตัวเลือกที่ 1',
                  value: '1',
                },
                {
                  label: 'ตัวเลือกที่ 2',
                  value: '2',
                },
                {
                  label: 'ตัวเลือกที่ 3',
                  value: '3',
                },
              ]}
            />
          </div>

          <div className="my-10 flex justify-between gap-5">
            {liff.isInClient?.() && (
              <Button
                label="ปิด"
                variant="primary"
                className="w-full max-w-[264px]"
                onClick={() => {
                  liff.closeWindow()
                }}
              />
            )}
            <Button
              type="submit"
              label="ส่งคำตอบ"
              variant="ictTurquoise"
              className="w-full max-w-[264px]"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

export default Page

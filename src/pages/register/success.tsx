import type { NextPage } from 'next'
import Button from '~/components/Button'
import { IctMahidolOpenHouseWordmark } from '~/components/Icons'

const Page: NextPage = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-md flex-col items-center justify-center px-8 py-10">
      <IctMahidolOpenHouseWordmark className="mb-10 w-full" />

      <div className="mb-12 text-center">
        <h1 className="mb-5 font-heading text-4xl font-bold text-ict-turquoise">
          ลงทะเบียนสำเร็จ
        </h1>
        <h2 className="font-heading text-xl font-bold">
          ไปท่องมัลติเวิร์สกันเลย!
        </h2>
      </div>

      <img
        src="/static/images/nstar/nstar_atomic_success.svg"
        className="w-full max-w-sm"
        alt="Success"
      />

      <div className="mt-10 w-full text-center">
        <Button
          type="button"
          label="ปิด"
          variant="ictTurquoise"
          className="w-full sm:w-32"
        />
      </div>
    </div>
  )
}

export default Page

import type { NextPage } from 'next'
import { useLiff } from 'react-liff'
import Button from '~/components/Button'
import Wrapper from '~/layouts/Wrapper'
import Header from '~/routes/Activity/components/Header'

const Page: NextPage = () => {
  const { liff } = useLiff()

  return (
    <Wrapper className="px-5 py-10">
      <div className="mx-auto max-w-screen-md">
        <Header />
        <div className="my-8 text-center font-heading">
          <h2 className="mb-2 text-xl font-normal">จุดที่ 2</h2>
          <h1 className="text-3xl font-bold">Meet & Greet</h1>
        </div>

        <img
          src="/static/images/nstar/nstar_correct.svg"
          className="mx-auto h-40 max-w-sm"
          alt="Success"
        />

        <div className="mt-10 w-full space-y-5 text-center">
          <div className="font-heading text-5xl font-bold text-ict-turquoise">
            ยินดีด้วย!!
          </div>
          <div className="font-heading text-2xl">น้องผ่านภารกิจแล้ว</div>
        </div>

        {liff.isInClient?.() && (
          <div className="mt-10 w-full text-center">
            <Button
              type="button"
              label="ปิด"
              variant="primary"
              className="w-32"
              onClick={() => {
                liff.closeWindow()
              }}
            />
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default Page

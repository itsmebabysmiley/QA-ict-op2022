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
          <h1 className="mb-2 text-3xl font-bold">เก่งมากเลย</h1>
          <h2 className="text-xl font-bold">นี่!! รับรางวัลไปเลยยย</h2>
        </div>

        <img
          src="/static/images/nstar/nstar_atomic_success.svg"
          className="w-full max-w-sm"
          alt="Success"
        />

        {liff.isInClient?.() && (
          <div className="mt-10 w-full text-center">
            <Button
              type="button"
              label="ปิด"
              variant="ictTurquoise"
              className="w-full sm:w-32"
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

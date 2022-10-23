import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useLiff } from 'react-liff'
import Button from '~/components/Button'
import Wrapper from '~/layouts/Wrapper'
import Header from '~/routes/Activity/components/Header'

const Page: NextPage = () => {
  const { query, push } = useRouter()
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
          src="/static/images/nstar/nstar_wrong.svg"
          className="mx-auto h-40 max-w-sm"
          alt="Wrong Answer"
        />

        <div className="mt-10 w-full space-y-5 text-center">
          <div className="font-heading text-5xl font-bold text-ict-magenta-process">
            คำตอบผิด!!
          </div>
          <div className="font-heading text-2xl">ไม่เป็นไรนะ พยายามหาเข้า</div>
        </div>

        <div className="my-10 flex justify-between gap-5">
          {liff.isInClient?.() && (
            <Button
              label="ปิด"
              variant="primary"
              className="mx-auto w-full max-w-[264px]"
              onClick={() => {
                liff.closeWindow()
              }}
            />
          )}
          <Button
            type="button"
            label="ตอบอีกครั้ง"
            variant="ictTurquoise"
            className="mx-auto w-full max-w-[264px]"
            onClick={() => {
              push({
                pathname: '/activity/q/[id]',
                query: {
                  ...query,
                },
              })
            }}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default Page

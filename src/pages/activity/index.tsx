import type { NextPage } from 'next'
import Button from '~/components/Button'
import Wrapper from '~/layouts/Wrapper'
import Header from '~/routes/Activity/components/Header'
import ActivityCardGrid from '~/routes/Activity/containers/ActivityCardGrid'

const Page: NextPage = () => {
  return (
    <Wrapper className="px-5 py-10">
      <div className="mx-auto max-w-screen-md">
        <Header />
        <div className="my-8 text-center font-heading">
          <h1 className="mb-2 text-3xl font-bold">สมุดบันทึกของ</h1>
          <h2 className="text-xl font-bold">น้อนสตาร์</h2>
        </div>
        <ActivityCardGrid
          activities={[
            { icon: 'op2022:app-registration', title: 'Check in' },
            { icon: 'op2022:modern-mic', title: 'Meet & Greet' },
            { icon: 'op2022:earth', title: 'Intl. Experiences', success: true },
            { icon: 'op2022:chalkboard-teacher', title: 'Guidance' },
            { icon: 'op2022:text-snippet', title: 'Innovative Project' },
            { icon: 'op2022:star-half', title: 'Evaluation' },
          ]}
        />

        <div className="my-10">
          <Button label="รับรางวัล" variant="ictTurquoise" className="w-full" />
        </div>
      </div>
    </Wrapper>
  )
}

export default Page

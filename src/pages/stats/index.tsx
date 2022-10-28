import useSWR from 'swr'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import dayjs from '~/utils/dayjs'
import { IctMahidolOpenHouseWordmark } from '~/components/Icons'
import LoadingWrapper from '~/layouts/LoadingWrapper'
import Wrapper from '~/layouts/Wrapper'
import type { ApiResponseSuccess } from '~/types/api'
import { fetcher } from '~/utils'

export const getStaticProps: GetStaticProps = async ({ locale = 'th' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'register'])),
  },
})

const Page = () => {
  const { data } = useSWR<
    ApiResponseSuccess<{ total: number; timestamp: string }>
  >(
    {
      url: 'api/v1/stats/total',
      method: 'GET',
    },
    fetcher,
    {
      refreshInterval: 3000,
    }
  )

  if (!data) {
    return <LoadingWrapper />
  }

  return (
    <Wrapper className="flex flex-col items-center justify-center p-10">
      <IctMahidolOpenHouseWordmark className="mx-auto h-36" />

      <div className="mt-10 flex justify-center gap-8">
        {data?.payload.total
          .toString()
          .split('')
          .map((number, index) => (
            <div
              key={index}
              className="inline-block w-44 rounded-xl bg-white p-5 text-center font-heading font-bold text-ict-magenta-process"
            >
              <div className="text-center text-[200px] font-bold">{number}</div>
            </div>
          ))}
      </div>

      <div>
        <div className="mt-10 text-center font-heading text-2xl font-bold">
          ข้อมูล ณ วันที่{' '}
          {dayjs(data?.payload.timestamp).format('DD MMMM YYYY HH:mm:ss น.')}
        </div>
      </div>
    </Wrapper>
  )
}

export default Page

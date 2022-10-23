import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

interface FetcherProps
  extends Pick<AxiosRequestConfig<any>, 'method' | 'url' | 'data'> {
  token?: string
}

export const fetcher = ({ method, url, token, data }: FetcherProps) =>
  axios({
    method,
    url,
    data,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  }).then((res) => res.data)

import { Liff } from '@line/liff/dist/lib'

declare global {
  // const mongoose: any

  interface Window {
    liff: Liff
  }
}

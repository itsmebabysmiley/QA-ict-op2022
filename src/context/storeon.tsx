import type { ComponentProps, FC, Provider } from 'react'
import { ComponentType, createContext } from 'react'
import type { StoreonStore } from 'storeon'
import { createStoreon } from 'storeon'
import { customContext } from 'storeon/react'
import type { FormEvent, FormStore } from './store/form'
import { form } from './store/form'

export const store = createStoreon<FormStore, FormEvent>([form])

const StoreonContext = createContext(store)

export const useStoreon = customContext(StoreonContext)

export const Context: FC<
  ComponentProps<Provider<StoreonStore<FormStore, FormEvent>>>
> = ({ children }) => {
  return (
    <StoreonContext.Provider value={store}>{children}</StoreonContext.Provider>
  )
}

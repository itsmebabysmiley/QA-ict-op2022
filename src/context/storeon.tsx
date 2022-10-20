import type { ComponentProps, FC, Provider, ReactNode } from 'react'
import { ComponentType, createContext } from 'react'
import type { StoreonStore } from 'storeon'
import { createStoreon } from 'storeon'
import { customContext } from 'storeon/react'
import { storeonDevtools } from 'storeon/devtools'
import type { FormEvent, FormStore } from './store/form'
import { form } from './store/form'

export const store = createStoreon<FormStore, FormEvent>([
  form,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
])

const StoreonContext = createContext(store)

export const useStoreon = customContext(StoreonContext)

export const Context: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StoreonContext.Provider value={store}>{children}</StoreonContext.Provider>
  )
}

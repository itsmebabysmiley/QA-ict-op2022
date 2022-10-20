import type { StoreonModule } from 'storeon'

interface RegisterFormFields {
  firstName: string
  lastName: string
  dateOfBirth: Date
  email: string
  phone: string
  province: string
  school: string
  level: string
}

export interface FormStore {
  registerForm: {
    currentStep: number
    fields?: Partial<RegisterFormFields>
  }
}

export interface FormEvent {
  'registerForm/nextStep': void
  'registerForm/prevStep': void
  'registerForm/setFields': Partial<RegisterFormFields>
}

export const form: StoreonModule<FormStore, FormEvent> = (store) => {
  store.on('@init', () => ({
    registerForm: {
      currentStep: 1,
      fields: {},
    },
  }))

  store.on('registerForm/nextStep', (store, event) => ({
    registerForm: {
      ...store.registerForm,
      currentStep: store.registerForm.currentStep + 1,
    },
  }))

  store.on('registerForm/prevStep', (store, event) => ({
    registerForm: {
      ...store.registerForm,
      currentStep: store.registerForm.currentStep - 1,
    },
  }))

  store.on('registerForm/setFields', (store, fields) => ({
    registerForm: {
      ...store.registerForm,
      fields: {
        ...store.registerForm.fields,
        ...fields,
      },
    },
  }))
}

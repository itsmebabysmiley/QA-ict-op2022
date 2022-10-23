import { Icon } from '@iconify/react'
import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'
import { FC, forwardRef } from 'react'

export interface ChoiceInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  selected?: boolean
  label: string
  type: 'radio' | 'checkbox'
}

const iconType = {
  radio: {
    checked: 'op2022:radio-button-checked',
    unchecked: 'op2022:radio-button-unchecked',
  },
  checkbox: {
    checked: 'op2022:check-box-checked',
    unchecked: 'op2022:check-box-unchecked',
  },
}

const ChoiceInput = forwardRef<HTMLInputElement, ChoiceInputProps>(
  (
    { className, selected = false, label, id, type = 'radio', ...props },
    ref
  ) => {
    return (
      <div>
        <input
          id={id}
          ref={ref}
          type={type}
          className={clsx('hidden', className)}
          {...props}
        />
        <label
          className={clsx(
            'flex cursor-pointer items-center gap-3 rounded-xl border border-white py-3 px-4',
            selected ? 'bg-white text-black' : 'bg-transparent text-white'
          )}
          htmlFor={id}
        >
          <Icon
            icon={iconType[type][selected ? 'checked' : 'unchecked']}
            className={clsx(
              'h-6 w-6 shrink-0',
              selected && 'text-ict-turquoise'
            )}
          />
          <span>{label}</span>
        </label>
      </div>
    )
  }
)

ChoiceInput.displayName = 'RadioInput'

export default ChoiceInput

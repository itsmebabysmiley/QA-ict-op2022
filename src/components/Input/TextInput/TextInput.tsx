import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import BaseInput from '../BaseInput'
import InputLabel from '../InputLabel'

interface TextInputProps
  extends Omit<ComponentProps<typeof BaseInput>, 'type'> {
  label?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, label, required, className, ...props }, ref) => {
    return (
      <div>
        {label && (
          <InputLabel
            htmlFor={name}
            label={label}
            className="mb-1 block"
            required={required}
          />
        )}
        <BaseInput
          type="text"
          id={name}
          name={name}
          ref={ref}
          required={required}
          className={clsx('block', className)}
          {...props}
        />
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'

export default TextInput

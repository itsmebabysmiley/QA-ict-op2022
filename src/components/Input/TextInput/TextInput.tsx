import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'
import BaseInput from '../BaseInput'
import InputLabel from '../InputLabel'

interface TextInputProps
  extends Omit<ComponentProps<typeof BaseInput>, 'type'> {
  label?: string
}

const TextInput: FC<TextInputProps> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
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
        className={clsx('block', className)}
        {...props}
      />
    </div>
  )
}

export default TextInput

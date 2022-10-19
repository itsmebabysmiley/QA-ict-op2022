import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'
import BaseInput from '../BaseInput'
import InputLabel from '../InputLabel'

interface TextInputProps
  extends Omit<ComponentProps<typeof BaseInput>, 'type'> {
  label?: string
}

const TextInput: FC<TextInputProps> = ({
  id,
  label,
  required,
  className,
  ...props
}) => {
  return (
    <>
      {label && (
        <InputLabel
          htmlFor={id}
          label={label}
          className="mb-1 block"
          required={required}
        />
      )}
      <BaseInput type="text" className={clsx('block', className)} {...props} />
    </>
  )
}

export default TextInput

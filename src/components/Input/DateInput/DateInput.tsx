import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'
import BaseInput from '../BaseInput'
import InputLabel from '../InputLabel'

interface DateInputProps extends Omit<ComponentProps<'input'>, 'type'> {
  label?: string
}

const DateInput: FC<DateInputProps> = ({
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
        type="date"
        id={name}
        name={name}
        className={clsx('block', className)}
        {...props}
      />
    </div>
  )
}

export default DateInput

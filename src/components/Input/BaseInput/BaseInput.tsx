import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'

interface BaseInputProps extends ComponentProps<'input'> {}

const BaseInput: FC<BaseInputProps> = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        'rounded-xl border border-gray-200 py-2 px-3 outline-none placeholder:text-gray-300',
        className
      )}
      {...props}
    />
  )
}

export default BaseInput

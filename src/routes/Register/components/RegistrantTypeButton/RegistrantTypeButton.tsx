import clsx from 'clsx'
import type { FC } from 'react'

interface TypeButtonProps {
  label: string
  icon: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const RegistrantTypeButton: FC<TypeButtonProps> = ({
  label,
  icon,
  variant = 'primary',
}) => {
  return (
    <div className="relative flex h-52 w-32 flex-col items-center overflow-hidden rounded-xl bg-dst-prussian-blue font-heading shadow-md">
      {icon && (
        <div
          className={clsx(
            `bg-type-button-overlay-${variant}`,
            'flex h-36 w-full flex-grow items-center justify-center bg-dst-prussian-blue bg-size-double bg-center bg-no-repeat p-4 bg-blend-screen'
          )}
        >
          <img src={icon} alt={label} className="h-auto w-full" />
        </div>
      )}
      <div className="z-10 flex h-14 w-full flex-grow-0 items-center justify-center break-words bg-ict-terquoise py-1 text-center font-bold leading-5 text-white">
        {label}
      </div>
    </div>
  )
}

export default RegistrantTypeButton

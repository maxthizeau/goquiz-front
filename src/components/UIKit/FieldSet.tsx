import React from 'react'
import { FieldError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface Props extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label: string
  icon?: React.ReactNode
  errors?: Pick<FieldError, 'message'>
}

const FieldSet: React.FC<Props> = ({
  label,
  children,
  className,
  icon,
  errors,
  ...props
}) => {
  return (
    <fieldset className={twMerge('', className)} {...props}>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {icon} {label}
      </label>
      {errors && (
        <span className="block text-sm font-medium text-red-500">
          {errors.message}
        </span>
      )}
      {children}
    </fieldset>
  )
}

export default FieldSet

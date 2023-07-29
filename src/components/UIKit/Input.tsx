import React, { forwardRef } from 'react'
import { twMerge, ClassNameValue } from 'tailwind-merge'

type FieldState = 'default' | 'error' | 'success'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  fieldState?: FieldState
}

const fieldStateClass = {
  default: 'border-gray-300',
  error: 'border-red-500',
  success: 'border-green-500',
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, fieldState = 'default', ...props }, ref) => {
    return (
      <input
        className={twMerge(
          ' rounded-lg px-2 py-1',
          fieldStateClass[fieldState],
          className
        )}
        {...props}
        ref={ref}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input

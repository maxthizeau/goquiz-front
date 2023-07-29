import React from 'react'
import { twMerge } from 'tailwind-merge'
import Spinner from './Spinner'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
}

const Card: React.FC<Props> = ({
  className,
  children,
  isLoading,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        ' relative z-0 rounded-lg border-4 border-solid border-gray-200 bg-gray-50 p-8 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
      {isLoading && <Spinner withOverlay />}
    </div>
  )
}

export default Card

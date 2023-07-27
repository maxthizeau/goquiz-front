import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <div
      className={twMerge(
        ' rounded-lg border-4 border-solid border-gray-200 bg-gray-50 p-8 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card

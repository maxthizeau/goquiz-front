import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = React.HTMLAttributes<HTMLHeadingElement>

const Title: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <>
      <h1 className={twMerge('text-xl font-bold', className)} {...props}>
        {children}
      </h1>
    </>
  )
}

export default Title

import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  withOverlay?: boolean
}

const Spinner: React.FC<Props> = ({ className, ...props }) => {
  const OnlySpinner = (
    <>
      <div
        className={twMerge(
          'h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-50',
          className
        )}
        {...props}
      ></div>
    </>
  )

  if (props.withOverlay) {
    return (
      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-sky-950/50">
        {OnlySpinner}
      </div>
    )
  }

  return OnlySpinner
}

export default Spinner

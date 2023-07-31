import { Transition } from '@headlessui/react'
import React from 'react'
import { createPortal } from 'react-dom'

type Props = {
  active: boolean
  text?: string
}

const LoadingOverlay: React.FC<Props> = ({ active, text }) => {
  return createPortal(
    <Transition
      show={active}
      enter="bg-sky-950 transition-opacity duration-[0ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-200 transition-opacity ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-sky-950">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-50"></div>
        <p className="mt-4 font-light text-white">{text ?? 'Loading...'}</p>
      </div>
    </Transition>,
    document.body
  )
}

export default LoadingOverlay

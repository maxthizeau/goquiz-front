import Button from '@/components/UIKit/Button'
import { useAuth } from '@/contexts/AuthProvider'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const menus = {
  default: [
    {
      href: '/auth',
      text: 'Login',
    },
  ],
  loggedIn: [
    {
      href: '/quiz/create',
      text: 'Create a quiz',
    },
    {
      href: '/question',
      text: 'Suggest questions',
    },
    {
      href: '/auth',
      text: 'Profile',
    },
  ],
  inGame: [
    {
      href: '/',
      text: 'Leave game',
    },
    {
      href: '/auth',
      text: 'Profile',
    },
  ],
}

const RootLayout: FC<IProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const selectedMenu = isAuthenticated ? menus['loggedIn'] : menus['default']
  return (
    <div className="flex h-screen w-screen flex-col items-start justify-center gap-4 bg-sky-950 px-12 py-8 sm:px-24 sm:py-12 ">
      <div className="flex w-full  justify-center gap-4 p-4 text-lg font-bold text-white">
        {selectedMenu.map(({ href, text }) => (
          <Button
            asLink
            href={href}
            variant={'none'}
            className="border border-transparent transition-all hover:border-white "
          >
            {text}
          </Button>
        ))}
      </div>

      <div className="flex w-full flex-grow items-start justify-center">
        {children}
      </div>
    </div>
  )
}

export default RootLayout

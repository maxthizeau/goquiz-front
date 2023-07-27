import Button from '@/components/UIKit/Button'
import { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const menus = {
  default: [
    {
      href: '/',
      text: 'Login',
    },
  ],
  loggedIn: [
    {
      href: '/',
      text: 'Create a quiz',
    },
    {
      href: '/',
      text: 'Suggest questions',
    },
  ],
  inGame: [
    {
      href: '/',
      text: 'Leave game',
    },
  ],
}

const RootLayout: FC<IProps> = ({ children }) => {
  const selectedMenu = menus['inGame']
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-sky-950 px-12 py-8 sm:px-24 sm:py-12 ">
      <div className="flex  w-full justify-center gap-4 p-4 text-lg font-bold text-white">
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

      {children}
    </div>
  )
}

export default RootLayout

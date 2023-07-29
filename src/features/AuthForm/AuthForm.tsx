import React from 'react'
import { useAuth } from '../../contexts/AuthProvider'
import LogoutMessage from './components/LogoutMessage'
import Card from '@/components/UIKit/Card'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import { twMerge } from 'tailwind-merge'

type Props = unknown
type TabIndex = 'login' | 'signup'
type Tab = {
  index: TabIndex
  name: string
}

const tabs: Tab[] = [
  {
    index: 'login',
    name: 'Log in',
  },
  {
    index: 'signup',
    name: 'Sign up',
  },
]

const AuthForm: React.FC<Props> = () => {
  const [tab, setTab] = React.useState<TabIndex>('login')
  const { isAuthenticated, user, logout } = useAuth()

  if (isAuthenticated && user) {
    return (
      <Card className=" w-96 flex-shrink">
        <LogoutMessage username={user.username} logout={logout} />
      </Card>
    )
  }

  return (
    <Card className=" w-96 flex-shrink">
      <menu className="mb-8 flex w-full justify-evenly">
        {tabs.map(({ index, name }) => {
          return (
            <button
              key={index}
              className={twMerge(
                'px-4 py-2',
                tab === index
                  ? 'border-b-2 border-blue-500 font-bold text-blue-500'
                  : ' text-gray-700'
              )}
              // variant={tab === index ? 'primary' : 'secondary'}
              onClick={() => {
                setTab(index)
              }}
            >
              {name}
            </button>
          )
        })}
      </menu>
      {tab === 'login' ? <LoginForm /> : <SignupForm />}
    </Card>
  )
}

export default AuthForm

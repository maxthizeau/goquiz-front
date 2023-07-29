import Button from '@/components/UIKit/Button'
import React from 'react'

type Props = {
  username: string
  logout: () => void
}

const LogoutMessage: React.FC<Props> = ({ username, logout }) => {
  return (
    <div className="p-4 text-center">
      <p>You are logged in as : {username}</p>
      <Button onClick={logout} className="mx-auto my-4">
        Logout
      </Button>
    </div>
  )
}

export default LogoutMessage

import React, { createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const GuardContext = createContext<{
  redirectUrl: string | null
  message: string | null
  setRedirectUrl: React.Dispatch<React.SetStateAction<string | null>>
  setMessage: React.Dispatch<React.SetStateAction<string | null>>
} | null>(null)

export const GuardProvider = ({ children }: { children: React.ReactNode }) => {
  const [redirectUrl, setRedirectUrl] = React.useState<string | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)

  return (
    <GuardContext.Provider
      value={{ redirectUrl, message, setMessage, setRedirectUrl }}
    >
      {children}
    </GuardContext.Provider>
  )
}

export const useGuard = ({
  redirectUrl,
  message,
}: {
  redirectUrl?: string
  message?: string
}) => {
  const navigate = useNavigate()
  const auth = useAuth()
  const [mounted, setMounted] = React.useState(false)
  const guardContext = React.useContext(GuardContext)

  if (!guardContext) {
    throw new Error('useGuard has to be used within <GuardProvider>')
  }

  useEffect(() => {
    if (!auth.isAuthenticated) {
      guardContext.setMessage(message || null)
      guardContext.setRedirectUrl(redirectUrl || null)
    }
    setMounted(true)
  }, [redirectUrl, message, auth.isAuthenticated])

  useEffect(() => {
    if (mounted && !auth.isAuthenticated) {
      navigate('/auth')
    }
  }, [auth.isAuthenticated, mounted])

  return true
}

export const useGuardValues = () => {
  const guardContext = React.useContext(GuardContext)
  const navigate = useNavigate()
  if (!guardContext) {
    throw new Error('useGuardMessage has to be used within <GuardProvider>')
  }

  return {
    message: guardContext.message,
    redirectUrl: guardContext.redirectUrl,
    redirect: () => {
      guardContext.setMessage(null)
      guardContext.setRedirectUrl(null)
      if (guardContext.redirectUrl) {
        navigate(guardContext.redirectUrl)
      }
    },
  }
}

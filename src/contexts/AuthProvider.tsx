import { UserRepository } from '@/repository/user/user'
import { UseMutationResult, useMutation } from '@tanstack/react-query'
import React, { createContext } from 'react'
import cookie from 'js-cookie'
import { toast } from 'react-toastify'
import { AxiosError, isAxiosError } from 'axios'
import {
  GeneralResponse,
  GeneralResponseError,
} from '@/repository/generalResponse'
import {
  ModelAuth,
  ModelUserLoginInput,
  ModelUserSignupInput,
} from '@/__generated__/models.types'
import { useLoading } from './LoadingProvider'
import LoadingOverlay from '@/components/UIKit/LoadingOverlay'

type UserContext = {
  username: string
  token: string
}

type AuthContextValue = {
  isAuthenticated: boolean
  user: UserContext | null
  login: UseMutationResult<
    GeneralResponse<ModelAuth>,
    AxiosError<GeneralResponseError>,
    ModelUserLoginInput,
    unknown
  >
  signup: UseMutationResult<
    GeneralResponse<ModelAuth>,
    AxiosError<GeneralResponseError>,
    ModelUserSignupInput,
    unknown
  >
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = React.useState(false)
  const [user, setUser] = React.useState<UserContext | null>(null)

  function errorHandler(error: AxiosError<GeneralResponseError>) {
    if (isAxiosError(error)) {
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
        return error.response?.data
      }

      toast.error('Something went wrong')
    }
  }

  function successHandler(data: GeneralResponse<ModelAuth>) {
    if (!data.data.user || !data.data.token || !data.data.user.username) {
      throw new Error('Invalid response')
    }
    setUser({ username: data.data.user.username, token: data.data.token })
    cookie.set('token', data.data.token, { expires: 1 })
    toast.success('Login successful')
  }
  //,
  // AxiosError<GeneralResponseError>>
  const loginMutation = useMutation({
    mutationFn: UserRepository.login,
    onSuccess(data) {
      successHandler(data)
    },
    onError(error: AxiosError<GeneralResponseError>) {
      errorHandler(error)
    },
  })

  const signupMutation = useMutation({
    mutationFn: UserRepository.signup,
    onSuccess(data) {
      successHandler(data)
    },
    onError(error: AxiosError<GeneralResponseError>) {
      errorHandler(error)
    },
  })

  const refreshMutation = useMutation({
    mutationFn: UserRepository.refresh,
    onSuccess(data) {
      if (data.data.user && data.data.token && data.data.token !== '') {
        setUser({ username: data.data.user.username, token: data.data.token })
        cookie.set('token', data.data.token, { expires: 1 })
        // toast.success('Login successful')
      }
    },
  })

  React.useEffect(() => {
    const token = cookie.get('token')
    if (token) {
      refreshMutation.mutate()
    }
    setIsMounted(true)
  }, [])

  const values = {
    isAuthenticated: user !== null,
    user: user,
    login: loginMutation,
    signup: signupMutation,
    logout: () => {
      cookie.remove('token')
      setUser(null)
    },
  }

  const isLoading = refreshMutation.isPending || !isMounted
  return (
    <AuthContext.Provider value={values}>
      <LoadingOverlay active={isLoading} text="Loading user..." />
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContext = React.useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth has to be used within <AuthProvider>')
  }

  return authContext
}

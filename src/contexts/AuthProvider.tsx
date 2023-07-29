import {
  AuthResponse,
  UserLoginInput,
  UserRepository,
  UserSignupInput,
} from '@/repository/user/user'
import { UseMutationResult, useMutation } from '@tanstack/react-query'
import React, { Fragment, createContext } from 'react'
import cookie from 'js-cookie'
import { toast } from 'react-toastify'
import { AxiosError, isAxiosError } from 'axios'
import {
  GeneralResponse,
  GeneralResponseError,
} from '@/repository/generalResponse'
import { Transition } from '@headlessui/react'

type UserContext = {
  username: string
  token: string
}

type AuthContextValue = {
  isAuthenticated: boolean
  user: UserContext | null
  login: UseMutationResult<
    GeneralResponse<AuthResponse>,
    AxiosError<GeneralResponseError>,
    UserLoginInput,
    unknown
  >
  signup: UseMutationResult<
    GeneralResponse<AuthResponse>,
    AxiosError<GeneralResponseError>,
    UserSignupInput,
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

  function successHandler(data: GeneralResponse<AuthResponse>) {
    if (!data.data.user || !data.data.token) {
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
        toast.success('Login successful')
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
    logout: () => setUser(null),
  }

  return (
    <AuthContext.Provider value={values}>
      {/* Loading */}
      <Transition
        as={Fragment}
        show={refreshMutation.isPending || !isMounted}
        enter="bg-sky-950 transition-opacity duration-[0ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-200 transition-opacity ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed left-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-sky-950">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-50"></div>
          <p className="mt-4 font-light text-white">Loading...</p>
        </div>
      </Transition>

      {children}
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

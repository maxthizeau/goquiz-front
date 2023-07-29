import { GeneralResponse } from '../generalResponse'
import instance from '../instance'

export type UserResponse = {
  username: string
  email: string
}

export type AuthResponse = {
  user: UserResponse | null
  token: string
}

export type UserSignupInput = {
  username: string
  email: string
  password: string
}

export type UserLoginInput = {
  email: string
  password: string
}

async function signup(
  user: UserSignupInput
): Promise<GeneralResponse<AuthResponse>> {
  return (await instance.post('/signup', user)).data
}

const login = async (user: UserLoginInput) => {
  const response = await instance.post<GeneralResponse<AuthResponse>>(
    '/login',
    user
  )
  return response.data
}
const refresh = async () => {
  const response = await instance.post<GeneralResponse<AuthResponse>>(
    '/refresh'
  )
  return response.data
}

export const UserRepository = { signup, login, refresh }

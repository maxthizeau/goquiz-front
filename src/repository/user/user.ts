import {
  ModelAuth,
  ModelUserLoginInput,
  ModelUserSignupInput,
} from '@/__generated__/models.types'
import { GeneralResponse } from '../generalResponse'
import instance from '../instance'

// export type UserResponse = {
//   username: string
//   email: string
// }

// export type AuthResponse = {
//   user: UserResponse | null
//   token: string
// }

// export type UserSignupInput = {
//   username: string
//   email: string
//   password: string
// }

// export type UserLoginInput = {
//   email: string
//   password: string
// }

async function signup(
  user: ModelUserSignupInput
): Promise<GeneralResponse<ModelAuth>> {
  return (await instance.post('/signup', user)).data
}

const login = async (user: ModelUserLoginInput) => {
  const response = await instance.post<GeneralResponse<ModelAuth>>(
    '/login',
    user
  )
  return response.data
}
const refresh = async () => {
  const response = await instance.post<GeneralResponse<ModelAuth>>('/refresh')
  return response.data
}

export const UserRepository = { signup, login, refresh }

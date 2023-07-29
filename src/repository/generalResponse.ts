/*
    Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
*/

import { HttpStatusCode } from 'axios'

export type GeneralResponse<T> = {
  code: HttpStatusCode
  message: string
  data: T
}

type ValidationError = {
  field: string
  message: string
}

export type GeneralResponseError = {
  code: HttpStatusCode
  message: string
  data: ValidationError[] | string | null
}

export function isValidationError(
  data: GeneralResponseError['data']
): data is ValidationError[] {
  return Array.isArray(data)
}

export function isStringError(
  data: GeneralResponseError['data']
): data is string {
  return typeof data === 'string'
}

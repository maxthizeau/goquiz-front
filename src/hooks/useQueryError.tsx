import {
  GeneralResponseError,
  isStringError,
  isValidationError,
} from '@/repository/generalResponse'
import { UseQueryResult } from '@tanstack/react-query'
import { AxiosError, isAxiosError } from 'axios'
import { toast } from 'react-toastify'

type Props<T> = {
  query: Pick<
    UseQueryResult<T, AxiosError<GeneralResponseError, unknown>>,
    'error'
  >
}

export function useQueryError<T>({ query: { error } }: Props<T>) {
  function parseError(): string | undefined {
    if (!error) {
      return
    }

    if (!isAxiosError(error)) {
      console.warn('Error is not an axios error, not handled yet')
      return 'Error is not an axios error, not handled yet'
    }

    if (!error.response?.data.data) {
      toast.error('Something went wrong')
      return 'Something went wrong'
    }

    const errorData = error.response.data.data

    if (isStringError(errorData)) {
      toast.error(errorData)
      return errorData
    }

    if (isValidationError(errorData)) {
      let errorString = ''
      errorData.forEach((field) => {
        errorString += `${field.field}: ${field.message}\n`
      })
      toast.error(errorString)
      return errorString
    }
    console.error('Error has not been handled by parseError')
    console.error(error)
    return
  }

  return {
    parsedError: parseError(),
  }
}

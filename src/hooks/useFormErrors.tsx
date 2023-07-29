import { isStringError, isValidationError } from '@/repository/generalResponse'
import { UseMutationResult } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { XIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type Props<T extends FieldValues> = Pick<
  UseFormReturn<T>,
  'clearErrors' | 'getValues' | 'setError' | 'formState'
> & {
  mutation: UseMutationResult<any, Error, any, any>
}

/**
 * Handle errors from mutation, populate error field if it is a validation error and return an ErrorComponent that displays the root error
 *
 * @param param some result of useForm hook (by react-hook-form)
 * @param param.mutation result of useMutation hook (by react-query)
 * @returns ErrorComponent that displays the root error
 */
export function useFormErrors<FormData extends FieldValues>({
  getValues,
  setError,
  clearErrors,
  formState: { errors },
  mutation,
}: Props<FormData>) {
  const [animated, setAnimated] = React.useState(false)

  // Populate an error to a field
  const populateError = (
    field: `root.${string}` | 'root' | Path<FormData>,
    message: string
  ) => {
    setError(field, { type: 'deps', message })
  }

  // Set an error to Root (that should be displayed on ErrorComponent)
  const setGlobalError = (message: string | null) => {
    if (message === null) {
      clearErrors('root')
      return
    }

    setError('root', {
      type: 'deps',
      message: message,
    })
  }

  const isKeyOfFormData = (
    field: string | number | symbol
  ): field is keyof FormData => {
    const values = getValues()
    return field in values
  }

  // Handle mutation error
  useEffect(() => {
    if (!mutation.error) return

    if (!isAxiosError(mutation.error)) {
      console.warn('Error is not an axios error, not handled yet')
      return
    }

    const errorMessage = mutation.error.response?.data.message
    const errorData = mutation.error.response?.data.data
    if (!mutation.error.response || (!errorData && !errorMessage)) {
      setGlobalError('Something went wrong')
      return
    }

    if (!errorData && errorMessage) {
      setGlobalError(errorMessage)
      return
    }

    if (errorData && isStringError(errorData)) {
      setGlobalError(errorData)
      return
    }

    if (errorData && isValidationError(errorData)) {
      errorData.forEach((field) => {
        if (isKeyOfFormData(field.field)) {
          populateError(field.field as Path<FormData>, field.message)
        }
      })
    }
  }, [mutation.error])

  //Handle error animation
  useEffect(() => {
    if (errors.root === null) {
      return
    }
    setAnimated(true)
    const timeout = setTimeout(() => {
      setAnimated(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [errors.root])

  const ErrorComponent = () => {
    if (!errors.root) return null
    return (
      <div
        className={twMerge(
          `relative flex rounded bg-red-200 p-2 text-center text-sm text-red-700`
        )}
      >
        {animated && (
          <span className="absolute right-0 top-0 inline-flex h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75"></span>
        )}

        {errors.root?.message}
        <button
          className="absolute right-2 top-2"
          onClick={() => setGlobalError(null)}
        >
          <XIcon size={16} />
        </button>
      </div>
    )
  }

  return {
    ErrorComponent,
  }
}

/**
 *
 */

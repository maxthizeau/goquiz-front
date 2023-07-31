import Button from '@/components/UIKit/Button'
import FieldSet from '@/components/UIKit/FieldSet'
import Input from '@/components/UIKit/Input'
import { useAuth } from '@/contexts/AuthProvider'
import { useGuard, useGuardValues } from '@/contexts/Guard'
import { useFormErrors } from '@/hooks/useFormErrors'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = unknown

const LoginForm: React.FC<Props> = () => {
  type FormData = { Email: string; Password: string }
  const { redirect } = useGuardValues()
  const form = useForm<FormData>()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form
  const { login } = useAuth()

  const onSubmit = async (data: FormData) => {
    await login
      .mutateAsync({
        email: data.Email,
        password: data.Password,
      })
      .then(() => {
        redirect()
      })
  }

  const { ErrorComponent } = useFormErrors({
    ...form,
    mutation: login,
  })

  return (
    <form
      className="my-4 flex w-full flex-col gap-8 px-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ErrorComponent />
      <FieldSet label="Email" errors={errors.Email}>
        <Input
          {...register('Email', {
            required: { value: true, message: 'This field is required' },
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
          })}
          className="w-full"
          type="email"
          placeholder="Enter your email"
        />
      </FieldSet>
      <FieldSet label="Password" errors={errors.Password}>
        <Input
          {...register('Password', {
            required: { value: true, message: 'This field is required' },
          })}
          className="w-full"
          type="password"
          placeholder="Enter your password"
        />
      </FieldSet>

      <div className=" flex w-full items-center gap-8">
        <a href="#" className="text-sm text-blue-500 hover:underline">
          Forgot password?
        </a>
        <Button type="submit" className="w-1/2">
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm

import Button from '@/components/UIKit/Button'
import FieldSet from '@/components/UIKit/FieldSet'
import Input from '@/components/UIKit/Input'
import { useAuth } from '@/contexts/AuthProvider'
import { useGuardValues } from '@/contexts/Guard'
import { useFormErrors } from '@/hooks/useFormErrors'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = unknown

const SignupForm: React.FC<Props> = () => {
  type FormData = {
    Email: string
    Password: string
    ConfirmPassword: string
    Username: string
  }
  const { redirect } = useGuardValues()
  const form = useForm<FormData>()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form
  const { signup } = useAuth()

  const onSubmit = async (data: FormData) => {
    await signup
      .mutateAsync({
        email: data.Email,
        password: data.Password,
        username: data.Username,
      })
      .then(() => {
        redirect()
      })
  }

  const { ErrorComponent } = useFormErrors({
    ...form,
    mutation: signup,
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
          placeholder="Used to login"
        />
      </FieldSet>
      <FieldSet label="Username" errors={errors.Username}>
        <Input
          {...register('Username', {
            required: { value: true, message: 'This field is required' },
          })}
          className="w-full"
          type="text"
          placeholder="How other users see you"
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
      <FieldSet label="Password confirmation" errors={errors.ConfirmPassword}>
        <Input
          {...register('ConfirmPassword', {
            required: { value: true, message: 'This field is required' },
            validate: (value) =>
              value === form.getValues('Password') || 'Passwords do not match',
          })}
          className="w-full"
          type="password"
          placeholder="Confirm your password"
        />
      </FieldSet>

      <div className="flex w-full items-center justify-end gap-8">
        <Button type="submit" className="w-1/2">
          Sign up
        </Button>
      </div>
    </form>
  )
}

export default SignupForm

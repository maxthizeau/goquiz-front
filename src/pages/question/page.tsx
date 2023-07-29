import Button from '@/components/UIKit/Button'
import Card from '@/components/UIKit/Card'
import FieldSet from '@/components/UIKit/FieldSet'
import Input from '@/components/UIKit/Input'
import Title from '@/components/UIKit/Title'
import { useFormErrors } from '@/hooks/useFormErrors'
import {
  CreateQuestionInput,
  QuestionRepository,
} from '@/repository/question/question'
import { useMutation } from '@tanstack/react-query'
import {
  CheckCircle2,
  HelpCircle,
  PlusIcon,
  XCircle,
  XIcon,
} from 'lucide-react'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const Page: React.FC = () => {
  type FormData = {
    Question: string
    CorrectAnswers: { value: string }[]
    WrongAnswers: { value: string }[]
  }
  const form = useForm<FormData>({
    defaultValues: {
      CorrectAnswers: [{ value: '' }],
      WrongAnswers: [{ value: '' }],
    },
  })

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = form
  const correctFieldArray = useFieldArray<FormData, 'CorrectAnswers', 'id'>({
    control,
    name: 'CorrectAnswers',
  })
  const wrongFieldArray = useFieldArray<FormData, 'WrongAnswers', 'id'>({
    control,
    name: 'WrongAnswers',
  })

  const mutation = useMutation({
    mutationFn: QuestionRepository.createQuestion,
    onSuccess: () => {
      toast.success('Question created')
      form.reset()
    },
  })

  useEffect(() => {
    form.clearErrors('CorrectAnswers')
    form.clearErrors('WrongAnswers')
  }, [form.watch('CorrectAnswers'), form.watch('WrongAnswers')])

  const onSubmit = (data: FormData) => {
    const validCorrectAnswers =
      data.CorrectAnswers.every((a) => a.value !== '') &&
      data.CorrectAnswers.length > 0
    const validWrongAnswers =
      data.WrongAnswers.every((a) => a.value !== '') &&
      data.WrongAnswers.length > 0

    if (!validCorrectAnswers) {
      form.setError('root', {
        type: 'deps',
        message: 'Please provide at least one correct answer',
      })
      return
    }
    if (!validWrongAnswers) {
      form.setError('root', {
        type: 'deps',
        message: 'Please provide at least one wrong answer',
      })
      return
    }

    const input: CreateQuestionInput = {
      label: data.Question,
      correct_answers: data.CorrectAnswers.map((answer) => answer.value),
      wrong_answers: data.WrongAnswers.map((answer) => answer.value),
    }

    mutation.mutate(input)
  }

  const { ErrorComponent } = useFormErrors<FormData>({ ...form, mutation })

  return (
    <Card className="w-96 lg:w-1/2 xl:w-[40rem]" isLoading={mutation.isPending}>
      <Title>Suggest a new question</Title>
      <form
        className="flex flex-col gap-4 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ErrorComponent />
        <FieldSet
          label="Question"
          icon={<HelpCircle size={14} />}
          errors={errors.Question}
        >
          <Input
            {...register('Question', {
              required: { value: true, message: 'This field is required' },
            })}
            type="text"
            className="w-full"
            placeholder="What is the capital of France?"
          />
        </FieldSet>

        <FieldSet
          label="Correct answer(s)"
          icon={<CheckCircle2 size={14} />}
          className="flex flex-col gap-2"
          errors={
            errors.CorrectAnswers?.message
              ? { message: errors.CorrectAnswers.message }
              : undefined
          }
        >
          {correctFieldArray.fields.map((field, index) => (
            <div className="flex items-center gap-2">
              <Input
                key={field.id}
                {...register(`CorrectAnswers.${index}.value` as const)}
                type="text"
                placeholder={index === 0 ? 'Paris' : 'Another correct answer'}
                className="w-full"
              />
              {index > 0 && (
                <button
                  type="button"
                  className="transition hover:scale-125"
                  onClick={() => {
                    correctFieldArray.remove(index)
                  }}
                >
                  <XIcon color="red" size={18} />
                </button>
              )}
            </div>
          ))}
          <Button
            className="mx-auto mt-1 justify-self-center border-none text-sm"
            variant={'secondary'}
            type="button"
            leftIcon={<PlusIcon size={16} />}
            onClick={() => correctFieldArray.append({ value: '' })}
          >
            Add another correct answer
          </Button>
        </FieldSet>
        <FieldSet
          label="Wrong answer(s)"
          icon={<XCircle size={14} />}
          className="flex flex-col gap-2"
          errors={
            errors.WrongAnswers?.message
              ? { message: errors.WrongAnswers.message }
              : undefined
          }
        >
          {wrongFieldArray.fields.map((field, index) => (
            <Input
              key={field.id}
              type="text"
              {...register(`WrongAnswers.${index}.value` as const)}
              className="w-full"
              placeholder={index === 0 ? 'Berlin' : 'Another wrong answer'}
            />
          ))}
          <Button
            className="mx-auto mt-1 justify-self-center border-none text-sm"
            variant={'secondary'}
            type="button"
            leftIcon={<PlusIcon size={16} />}
            onClick={() => wrongFieldArray.append({ value: '' })}
          >
            Add another wrong answer
          </Button>
        </FieldSet>
        <Button className="mt-4 w-full border-none text-sm">Submit</Button>
      </form>
    </Card>
  )
}

export default Page

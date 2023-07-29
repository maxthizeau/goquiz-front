import { GeneralResponse } from '../generalResponse'
import instance from '../instance'
import { UserResponse } from '../user/user'

export type Question = {
  question_id: string
  label: string
  created_by: UserResponse | null
  answers: Answer[]
  vote_count: number
  vote_sum: number
  difficulty: number
}

export type CreateQuestionInput = {
  label: string
  correct_answers: string[]
  wrong_answers: string[]
}

export type Answer = {
  answer_id: string
  label: string
  question_id: string
  is_correct: boolean
}

async function createQuestion(
  question: CreateQuestionInput
): Promise<GeneralResponse<Question>> {
  return (await instance.post('/question', question)).data
}

export const QuestionRepository = { createQuestion }

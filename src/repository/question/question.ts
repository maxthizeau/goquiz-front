import {
  ModelCreateQuestionInput,
  ModelQuestion,
} from '@/__generated__/models.types'
import { GeneralResponse } from '../generalResponse'
import instance from '../instance'

async function createQuestion(
  question: ModelCreateQuestionInput
): Promise<GeneralResponse<ModelQuestion>> {
  return (await instance.post('/question', question)).data
}

export const QuestionRepository = { createQuestion }

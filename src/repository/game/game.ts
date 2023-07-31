import {
  ModelGame,
  ModelGameResult,
  ModelGameStatus,
} from '@/__generated__/models.types'
import { GeneralResponse, GeneralResponseError } from '../generalResponse'
import instance from '../instance'
import { AxiosResponse } from 'axios'

async function getGame(gameId: string) {
  return (await instance.get<GeneralResponse<ModelGame>>(`/game/${gameId}`))
    .data
}

async function getGames() {
  return (await instance.get<GeneralResponse<ModelGame[]>>('/game')).data
}

async function getGameResults(gameId: string) {
  return (
    await instance.get<GeneralResponse<ModelGameResult>>(
      `/game/${gameId}/results`
    )
  ).data
}

async function createGame() {
  return (await instance.post<GeneralResponse<ModelGame>>('/game')).data
}

async function joinGame(gameId: string) {
  return (
    await instance.patch<GeneralResponse<ModelGame>>(`/game/${gameId}/join`)
  ).data
}
async function answerQuestionInGame(
  gameId: string,
  questionId: string,
  answerId?: string,
  text?: string
) {
  const body = {
    question_id: questionId,
    answer_id: answerId,
    text: text,
  }
  return (
    await instance.patch<GeneralResponse<ModelGame>>(
      `/game/${gameId}/answer`,
      body
    )
  ).data
}

async function getGameStatus(gameId: string) {
  return (await instance.get(`/game/${gameId}/status`)).data
}

export const GameRepository = {
  getGame,
  getGames,
  getGameResults,
  getGameStatus,
  createGame,
  joinGame,
  answerQuestionInGame,
}

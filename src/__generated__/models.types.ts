/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CommonValidationResponse {
  field?: string
  message?: string
}

export interface ControllerQuestionVoteInput {
  negative?: boolean
}

export enum EntityGameStatus {
  GameStatusCreated = 'created',
  GameStatusStarted = 'started',
  GameStatusEnded = 'ended',
}

export interface ModelAnswer {
  answer_id: string
  is_correct: boolean
  label: string
  question_id: string
}

export interface ModelAuth {
  token?: string
  user?: ModelUser
}

export interface ModelCreateQuestionInput {
  correct_answers: string[]
  label: string
  wrong_answers: string[]
}

export interface ModelGame {
  created_at: string
  end_at?: string
  game_id: string
  players: ModelUser[]
  questions: ModelQuestion[]
  started_at?: string
  status: EntityGameStatus
}

export interface ModelGameResult {
  created_at: string
  end_at?: string
  game_id: string
  players: ModelUser[]
  question_results: ModelQuestionResult[]
  questions: ModelQuestion[]
  started_at?: string
  status: EntityGameStatus
}

export interface ModelGameStatus {
  exists: boolean
  is_user_in_game: boolean
  status?: EntityGameStatus
}

export interface ModelGeneralResponse {
  code: number
  data: any
  message: string
}

export interface ModelQuestion {
  answers: ModelAnswer[]
  created_by?: ModelUser
  difficulty: number
  label: string
  question_id: string
  vote_count: number
  vote_sum: number
}

export interface ModelQuestionResult {
  answers: ModelAnswer[]
  created_by?: ModelUser
  difficulty: number
  label: string
  question_id: string
  user_answers?: ModelUserAnswer[]
  vote_count: number
  vote_sum: number
}

export interface ModelUser {
  email?: string
  username: string
}

export interface ModelUserAnswer {
  answer?: ModelAnswer
  game_id?: string
  is_correct?: boolean
  question_id: string
  text?: string
  user_answer_id: string
  user_id: string
}

export interface ModelUserLoginInput {
  email: string
  password: string
}

export interface ModelUserSignupInput {
  email: string
  /**
   * @minLength 8
   * @maxLength 30
   */
  password: string
  /**
   * @minLength 4
   * @maxLength 30
   */
  username: string
}

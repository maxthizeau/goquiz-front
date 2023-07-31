import { GameRepository } from '@/repository/game/game'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import {
  GeneralResponse,
  GeneralResponseError,
} from '@/repository/generalResponse'
import { ModelGameStatus } from '@/__generated__/models.types'
import { AxiosError } from 'axios'
import { useQueryError } from '@/hooks/useQueryError'
import { useLoading } from '@/contexts/LoadingProvider'

export const useGameQueries = ({ gameId }: { gameId: string }) => {
  const [stopFetch, setStopFetch] = React.useState(true)

  const gameStatusQuery = useQuery<
    GeneralResponse<ModelGameStatus>,
    AxiosError<GeneralResponseError>,
    ModelGameStatus
  >({
    queryFn: () => GameRepository.getGameStatus(gameId),
    queryKey: ['gameStatus', gameId],
    retry: false,
    select(data) {
      return data.data
    },
  })
  const { parsedError } = useQueryError({ query: gameStatusQuery })

  const gameQuery = useQuery({
    queryFn: () => GameRepository.getGame(gameId),
    queryKey: ['game', gameId],
    refetchInterval: 5000,
    enabled:
      (gameStatusQuery.data && gameStatusQuery.data.status === 'created') ||
      !stopFetch,
    select(data) {
      return data.data
    },
  })

  const joinMutation = useMutation({
    mutationFn: () => {
      return GameRepository.joinGame(gameId)
    },
    onSuccess: () => {
      setStopFetch(false)
      gameQuery.refetch()
    },
  })

  const hasError = joinMutation.error && gameQuery.error

  React.useEffect(() => {
    if (gameQuery.error) {
      joinMutation.mutate()
    }
  }, [gameQuery.error])

  const loaderGame = useLoading({
    isLoading: gameStatusQuery.isLoading || gameQuery.isLoading,
    message: 'Loading game...',
  })

  const loaderJoin = useLoading({
    isLoading: joinMutation.isPending,
    message: 'Joining game...',
  })

  console.log(loaderGame, loaderJoin)
  console.log(
    gameStatusQuery.isLoading || gameQuery.isLoading,
    'loading',
    joinMutation.isPending,
    'join'
  )

  return {
    parsedError,
    gameStatusQuery,
    gameQuery,
    joinMutation,
    hasError: hasError,
  }
}

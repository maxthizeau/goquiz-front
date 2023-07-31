import LoadingOverlay from '@/components/UIKit/LoadingOverlay'
import React from 'react'
import WaitingRoom from './components/WaitingRoom'
import ErrorCard from '@/components/Custom/ErrorCard'
import { useGameQueries } from './hooks/useGameQueries'

type Props = {
  gameId: string
}

const Game: React.FC<Props> = ({ gameId }) => {
  const { parsedError, gameStatusQuery, gameQuery, joinMutation, hasError } =
    useGameQueries({ gameId })

  if (parsedError) {
    return (
      <ErrorCard>
        Your link seems to be invalid. <p>{parsedError}</p>
      </ErrorCard>
    )
  }
  //   console.log(gameStatusQuery.isLoading)
  return (
    <>
      {hasError ? (
        <ErrorCard>
          <p>There was an error joining the game</p>
          <p>Please verify your link.</p>
          <h2>Errors :</h2>
          <p>{joinMutation.error?.message}</p>
          <p>{gameQuery.error?.message}</p>
        </ErrorCard>
      ) : (
        <WaitingRoom gameId={gameId} players={gameQuery.data?.players ?? []} />
      )}
    </>
  )
}

export default Game

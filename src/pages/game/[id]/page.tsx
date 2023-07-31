import ErrorCard from '@/components/Custom/ErrorCard'
import { useGuard } from '@/contexts/Guard'
import Game from '@/features/Game/Game'
import React from 'react'
import { useParams } from 'react-router-dom'

type Props = unknown

const Page: React.FC<Props> = () => {
  const params = useParams<{ id: string }>()

  useGuard({
    redirectUrl: `/game/${params.id}`,
    message: 'You need to be authenticated to play a game',
  })

  return (
    <>
      {params.id && <Game gameId={params.id} />}
      {!params.id && <ErrorCard>You need to provide a game id</ErrorCard>}
    </>
  )
}

export default Page

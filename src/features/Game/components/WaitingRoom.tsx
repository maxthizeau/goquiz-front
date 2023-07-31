import Button from '@/components/UIKit/Button'
import Input from '@/components/UIKit/Input'
import Title from '@/components/UIKit/Title'
import React from 'react'

type Props = {
  gameId: string
  players: Array<{ username: string }>
}

const WaitingRoom: React.FC<Props> = ({ gameId, players }) => {
  return (
    <>
      <div className="mb-4 flex flex-col items-center justify-between">
        <Title>Waiting for players to join</Title>
        <Input
          readOnly
          className="w-full text-center text-sm"
          // TODO: Change this to the actual URL with env value
          defaultValue={`http://localhost:5173/game/${gameId}`}
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4">
        {players.map((player, index) => (
          <div
            className=" flex w-full items-center gap-4 rounded bg-slate-200 p-4"
            key={index}
          >
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
            <span className="text-md font-bold">{player.username}</span>
          </div>
        ))}
      </div>
      <Button className="mt-4 w-full">Start</Button>
    </>
  )
}

export default WaitingRoom

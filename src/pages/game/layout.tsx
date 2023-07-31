import Card from '@/components/UIKit/Card'
import { useGuard } from '@/contexts/Guard'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren

const GameLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Card className="w-full md:w-[40rem]">{children}</Card>
    </>
  )
}

export default GameLayout

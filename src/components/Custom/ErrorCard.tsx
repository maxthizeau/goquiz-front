import React, { PropsWithChildren } from 'react'
import Card from '../UIKit/Card'

type Props = PropsWithChildren

const ErrorCard: React.FC<Props> = ({ children }) => {
  return <Card className="w-full border-red-600 md:w-[40rem]">{children}</Card>
}

export default ErrorCard

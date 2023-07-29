import Button from '@/components/UIKit/Button'
import Card from '@/components/UIKit/Card'
import Title from '@/components/UIKit/Title'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { FC, PropsWithChildren } from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge'

type Props = unknown

const CustomCard: FC<PropsWithChildren<{ className?: ClassNameValue }>> = ({
  children,
  className,
}) => {
  return (
    <Card
      className={twMerge(
        'bg-slate-200 px-2 py-1 text-sm font-semibold',
        className
      )}
    >
      {children}
    </Card>
  )
}

const IndexPage: React.FC<Props> = () => {
  return (
    <div className=" flex w-auto flex-col  place-items-center rounded-lg bg-transparent p-8 shadow-lg">
      <Title className="mb-4 text-sky-100">Question 1/10</Title>
      <Card className=" flex  flex-col justify-center gap-8">
        <div className="flex  w-full flex-wrap justify-between gap-2 ">
          <CustomCard>3 points</CustomCard>
          <CustomCard>Difficulty : 5/10</CustomCard>
          <CustomCard>02:00</CustomCard>
        </div>
        <Title>Quelle est la capitale de la France ?</Title>
        <Button variant={'primary'}>Paris</Button>
        <Button variant={'secondary'}>Londres</Button>
        <Button variant={'secondary'}>Marseille</Button>
        <Button variant={'secondary'}>Nîme</Button>
      </Card>
      <div className="my-4 flex  w-full items-center justify-between gap-4 text-center text-lg font-bold text-white">
        <Button variant="light" className="border-none text-red-200">
          <ThumbsDown />
        </Button>
        <div className="font-semibold">
          <p>Question score : 12</p> <p className="text-sm">(14 votes)</p>
        </div>
        <Button variant="light" className="border-none text-green-200">
          <ThumbsUp />
        </Button>
      </div>
    </div>
  )
}

export default IndexPage

import Button from '@/components/UIKit/Button'
import Card from '@/components/UIKit/Card'
import Title from '@/components/UIKit/Title'
import React from 'react'

const Page: React.FC = () => {
  return (
    <>
      <Title className="mb-4">Create a quiz</Title>

      <Button
        onClick={() => {
          return
        }}
        className="mx-auto"
      >
        Create a quiz and get invite link
      </Button>
    </>
  )
}

export default Page

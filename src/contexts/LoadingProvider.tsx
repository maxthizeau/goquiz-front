import React, { createContext, useEffect, useMemo } from 'react'
import LoadingOverlay from '@/components/UIKit/LoadingOverlay'
import { generateUUID } from '@/libs/utils'

const LoadingContext = createContext<{
  push: (key: string, text: string) => void
  kick: (key: string) => void
} | null>(null)

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [lastMessage, setLastMessage] = React.useState<string>('Loading...')
  const [stack, setStack] = React.useState<
    {
      key: string
      text: string
    }[]
  >([])

  const push = (key: string, text: string) => {
    console.log('push')
    setStack((prev) => {
      return [...prev, { key, text }]
    })
  }

  const kick = (key: string) => {
    console.log('pop')
    setStack((prev) => {
      return prev.filter((item) => item.key !== key)
    })
  }

  const isLoading = useMemo(() => {
    return stack.length > 0
  }, [stack.length])

  // Used to prevent the loading overlay to display the default message when stack[0] disappears
  useEffect(() => {
    if (isLoading && stack[0]) {
      setLastMessage(stack[0].text)
    }
  }, [isLoading])

  console.log(stack)
  return (
    <LoadingContext.Provider value={{ push, kick }}>
      <LoadingOverlay active={isLoading} text={lastMessage} />
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = ({
  message,
  isLoading,
}: {
  message?: string
  isLoading: boolean
}) => {
  const [isListening, setIsListening] = React.useState(true)
  const loadingContext = React.useContext(LoadingContext)
  const [generatedId, _] = React.useState(generateUUID())
  if (!loadingContext) {
    throw new Error('useLoading has to be used within <LoadingProvider>')
  }
  console.log(isLoading, isListening)
  useEffect(() => {
    console.log('Catched change in isLoading for generatedId', generatedId)
    if (!isListening) {
      return
    }
    if (isLoading) {
      loadingContext.push(generatedId, message ?? 'Loading...')
      return
    }
    if (!isLoading) {
      loadingContext.kick(generatedId)
    }
  }, [isLoading, isListening])

  return {
    generatedId: generatedId,
    isLoading: isLoading,
    isListening,
    subscribe: () => {
      setIsListening(true)
    },
    unsubscribe: () => {
      setIsListening(false)
    },
  }
}

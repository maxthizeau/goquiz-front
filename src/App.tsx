import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import './styles/globals.css'
import { FileBasedRoutingProvider } from './contexts/FilebasedRouting'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthProvider'
import { ToastContainer } from 'react-toastify'
import { GuardProvider } from './contexts/Guard'
import { LoadingProvider } from './contexts/LoadingProvider'

const queryClient = new QueryClient()

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <AuthProvider>
        <GuardProvider>
          <LoadingProvider>
            <FileBasedRoutingProvider />
          </LoadingProvider>
        </GuardProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

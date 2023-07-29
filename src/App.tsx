import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import './styles/globals.css'
import { FileBasedRoutingProvider } from './contexts/FilebasedRouting'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthProvider'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <AuthProvider>
        <FileBasedRoutingProvider />
      </AuthProvider>
    </QueryClientProvider>
  )
}

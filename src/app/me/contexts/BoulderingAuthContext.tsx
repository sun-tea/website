'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createContext, useContext, useState, ReactNode } from 'react'

import { BoulderingService } from '../services/BoulderingService'

interface BoulderingAuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
  login: () => void
  logout: () => void
  isLoggingIn: boolean
  isLoggingOut: boolean
  loginError: Error | null
  logoutError: Error | null
}

const BoulderingAuthContext = createContext<BoulderingAuthContextType | null>(null)

export const BoulderingAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: () => BoulderingService.login(),
    onSuccess: () => {
      console.log('Login successful!')
      setIsAuthenticated(true)
      // Invalidate and refetch bouldering data
      queryClient.invalidateQueries({ queryKey: ['bouldering-data'] })
    },
    onError: error => {
      console.error('Login failed:', error)
      setIsAuthenticated(false)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => BoulderingService.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      // Clear all bouldering-related cache
      queryClient.removeQueries({ queryKey: ['bouldering-data'] })
      queryClient.removeQueries({ queryKey: ['bouldering-stats'] })
    },
  })

  return (
    <BoulderingAuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
        loginError: loginMutation.error,
        logoutError: logoutMutation.error,
      }}
    >
      {children}
    </BoulderingAuthContext.Provider>
  )
}

export const useBoulderingAuth = () => {
  const context = useContext(BoulderingAuthContext)
  if (!context) {
    throw new Error('useBoulderingAuth must be used within a BoulderingAuthProvider')
  }
  return context
}
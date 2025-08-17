'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // Ensure we're on the client side and initialize theme
  useEffect(() => {
    setMounted(true)

    // Initialize theme synchronously to prevent hydration mismatch
    try {
      const savedTheme = localStorage.getItem('theme') as Theme
      let initialTheme: Theme = 'system'
      let initialResolved: 'light' | 'dark' = 'light'

      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        initialTheme = savedTheme
      }

      if (initialTheme === 'system') {
        initialResolved = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light'
      } else {
        initialResolved = initialTheme
      }

      setTheme(initialTheme)
      setResolvedTheme(initialResolved)

      // Set the class immediately to prevent flash
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(initialResolved)

      setInitialized(true)
    } catch (e) {
      console.log('Could not initialize theme:', e)
      setInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (!initialized) return

    // Resolve the actual theme (light/dark) based on current setting
    let newResolvedTheme: 'light' | 'dark'

    if (theme === 'system') {
      newResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
    } else {
      newResolvedTheme = theme
    }

    setResolvedTheme(newResolvedTheme)

    // Update document class
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(newResolvedTheme)
    }

    // Save preference
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme)
    }

    console.log('Theme resolved to:', newResolvedTheme, 'from setting:', theme)
  }, [theme, initialized])

  // Listen for system theme changes
  useEffect(() => {
    if (!initialized || theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      const newResolvedTheme = e.matches ? 'dark' : 'light'
      setResolvedTheme(newResolvedTheme)
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(newResolvedTheme)
      }
      console.log('System theme changed to:', newResolvedTheme)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, initialized])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  return context
}

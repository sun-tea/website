'use client'

import { useState, useEffect } from 'react'

export function useLastFm() {
  const [username, setUsername] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const cookies = document.cookie.split(';')
    const usernameCookie = cookies.find(cookie =>
      cookie.trim().startsWith('lastfm_username=')
    )

    if (usernameCookie) {
      const name = usernameCookie.split('=')[1]
      setUsername(name)
      setIsAuthenticated(true)
    }
  }, [])

  const logout = async () => {
    try {
      await fetch('/api/webhook/lastfm/logout', { method: 'POST' })
      document.cookie =
        'lastfm_username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/me;'

      setUsername(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return { username, isAuthenticated, logout }
}

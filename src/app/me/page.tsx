'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { siLastdotfm } from 'simple-icons'

import ThemeToggle from '../components/ThemeToggle'

import { ArtistCard } from './components/ArtistCard'
import { BoulderingCard } from './components/BoulderingCard'
import { DraggableArea } from './components/DraggableArea'
import { Logo } from './components/Logo'
import { TrackCard } from './components/TrackCard'
import {
  BoulderingAuthProvider,
  useBoulderingAuth,
} from './contexts/BoulderingAuthContext'
import { useMusicStats } from './hooks/useMusicStats'

function MyStatsContent() {
  const {
    data: musicData,
    isLoading: musicLoading,
    error: musicError,
  } = useMusicStats()
  const { isAuthenticated, login, isLoggingIn } = useBoulderingAuth()

  useEffect(() => {
    if (!isAuthenticated && !isLoggingIn) {
      login()
    }
  }, [isAuthenticated, isLoggingIn, login])

  return (
    <div
      className={`flex flex-col p-6 ${!musicData ? 'h-screen' : ''} bg-linear-to-bl from-sky-300 to-indigo-500 dark:bg-radial-[at_25%_25%] dark:from-purple-700 dark:to-indigo-950 dark:to-75% relative`}
    >
      <Link
        href="/"
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
      >
        ← Back to Portfolio
      </Link>
      <ThemeToggle />

      <div className="text-center m-auto text-lg text-slate-900 dark:text-slate-300">
        {musicLoading && 'Loading stats...'}
        {musicError && `Failed to load music stats: ${musicError.message}`}
        {!musicData && !musicLoading && 'No data available'}
      </div>

      {musicData && (
        <>
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-slate-300">
            Personal Dashboard
          </h1>

          {/* Bouldering Stats Card */}
          <div className="mb-6">
            <BoulderingCard />
          </div>

          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-slate-300">
            🎵 Music Activity
          </h2>

          {/* User Info */}
          <div className="mb-6 flex text-slate-900 dark:text-slate-300 gap-2">
            <Link href={musicData.userInfo?.url} target="_blank">
              <img
                src={
                  musicData.userInfo?.image?.find(
                    image => image.size === 'large'
                  )?.['#text']
                }
                alt={musicData.username}
                className="w-20 h-20 rounded-md shrink-0"
              />
            </Link>
            <div className="flex flex-col shrink-0">
              <Link href={musicData.userInfo?.url} target="_blank">
                <Logo icon={siLastdotfm} />
              </Link>
              <p>
                Username: <b>{musicData.userInfo?.name}</b>
              </p>
              <p>Total Scrobbles: {musicData.userInfo?.playcount}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DraggableArea
              items={musicData.recentTracks}
              title="Last listened tracks"
              renderCard={(track, index, props) => (
                <TrackCard track={track} index={index} {...props} />
              )}
            />
            <DraggableArea
              items={musicData.topArtists}
              title="Top artists of last 30 days"
              renderCard={(artist, index, props) => (
                <ArtistCard artist={artist} index={index} {...props} />
              )}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default function MyStatsPage() {
  return (
    <BoulderingAuthProvider>
      <MyStatsContent />
    </BoulderingAuthProvider>
  )
}

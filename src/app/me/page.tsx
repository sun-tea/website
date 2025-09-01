'use client'

import Link from 'next/link'

import ThemeToggle from '../components/ThemeToggle'
import { TrackCard } from './components/TrackCard'
import { DraggableArea } from './components/DraggableArea'
import { ArtistCard } from './components/ArtistCard'
import { useMusicStats } from './hooks/useMusicStats'

export default function MyMusicStats() {
  const { data: musicData, isLoading, error } = useMusicStats()

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
        {isLoading && 'Loading music stats...'}
        {error && `Failed to load music stats: ${error.message}`}
        {!musicData && !isLoading && 'No music data available'}
      </div>

      {musicData && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-slate-300">
            My Music Stats
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
            <div className="flex flex-col items-center shrink-0">
              <p>
                Username: <b>{musicData.userInfo?.name}</b>
              </p>
              <p>Total Scrobbles: {musicData.userInfo?.playcount}</p>
            </div>
          </div>

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
        </>
      )}
    </div>
  )
}

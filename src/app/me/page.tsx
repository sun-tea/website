'use client'

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
          <div className="mb-6 dark:text-slate-300">
            <h3 className="text-lg font-semibold">Profile</h3>
            <p>
              Username: <b>{musicData.username}</b>
            </p>
            <p>Total Scrobbles: {musicData.userInfo?.playcount}</p>
          </div>

          <DraggableArea
            items={musicData.recentTracks}
            title="Recent Tracks"
            renderCard={(track, index, props) => (
              <TrackCard track={track} index={index} {...props} />
            )}
          />
          <DraggableArea
            items={musicData.topArtists}
            title="Top Artists"
            renderCard={(artist, index, props) => (
              <ArtistCard artist={artist} index={index} {...props} />
            )}
          />
        </>
      )}
    </div>
  )
}

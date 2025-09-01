import { useState } from 'react'
import { motion } from 'framer-motion'

import { LastFMRecentTrack } from '../schemas'
import { NowPlayingIndicator } from './NowPlayingIndicator'
import { Props } from './DraggableArea'

type TrackCardProps = {
  track: LastFMRecentTrack
  index: number
} & Props

export const TrackCard = ({
  track,
  index,
  onBringToFront,
  zIndex,
  dragConstraintsRef,
}: TrackCardProps) => {
  const [customPosition, setCustomPosition] = useState({ x: 0, y: 0 })

  return (
    <motion.div
      drag
      dragConstraints={
        dragConstraintsRef ?? { left: -50, right: 300, top: -50, bottom: 200 }
      }
      dragElastic={0.2}
      whileDrag={{
        scale: 1.05,
        rotate: Math.random() * 10 - 5,
        cursor: 'grabbing',
      }}
      whileHover={{
        scale: 1.02,
        rotate: Math.random() * 3 - 1.5,
        cursor: 'grab',
      }}
      onDragStart={() => {
        onBringToFront(index)
      }}
      onDragEnd={(event, info) => {
        // Store the custom position when dragging ends
      }}
      initial={{
        opacity: 0,
        y: 50,
        rotate: Math.random() * 6 - 3,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: Math.random() * 6 - 3,
      }}
      transition={{
        type: 'spring',
        duration: 0.6,
        delay: index * 0.1,
      }}
      className={`absolute w-3xs bg-gradient-to-br p-5 rounded-2xl shadow-lg text-white min-w-80 max-w-sm select-none bg-radial-[at_80%_15%] from-sky-300 via-blue-500 to-indigo-800 dark:from-sky-600 dark:via-blue-800 dark:to-indigo-950 to-90%`}
      style={{
        left: `${20 + index * 60 + customPosition.x}px`,
        top: `${20 + index * 40 + customPosition.y}px`,
        transformOrigin: 'center',
        zIndex,
      }}
    >
      <div className="flex justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-s">
              {track.artist['#text']}
            </span>
          </div>
          <h3 className="text-lg font-bold leading-tight dark:text-slate-200">
            {track.name}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed dark:text-slate-300">
            {track.album['#text']}
          </p>
        </div>
        <div className="flex items-center justify-end shrink-0">
          <img
            src={track.image?.find(image => image.size === 'large')?.['#text']}
            alt={track.name}
            className="w-20 h-20 rounded-md"
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-3">
        <div className="flex text-xs items-center text-gray-400 dark:text-slate-400">
          {track['@attr']?.nowplaying === 'true' ? (
            <NowPlayingIndicator />
          ) : (
            <>
              {track.date?.['#text']
                ? new Date(track.date['#text']).toLocaleString()
                : ''}
            </>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/20 hover:bg-white/30 hover:cursor-pointer px-2 py-1 rounded-lg text-xs font-medium transition-colors"
          onClick={e => {
            e.stopPropagation()
            window.open(track.url, '_blank')
          }}
        >
          Go to Last.fm →
        </motion.button>
      </div>
    </motion.div>
  )
}

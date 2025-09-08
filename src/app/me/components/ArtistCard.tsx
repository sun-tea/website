import { motion } from 'framer-motion'
import { useState } from 'react'

import { LastFMTopArtist } from '../schemas'

import { Props } from './DraggableArea'

type ArtistCardProps = {
  artist: LastFMTopArtist
  index: number
} & Props

export function ArtistCard({
  artist,
  index,
  onBringToFront,
  zIndex,
  dragConstraintsRef,
}: ArtistCardProps) {
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
      onDragEnd={(event, info) => {}}
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
      className={`absolute w-3xs bg-gradient-to-br p-5 rounded-2xl shadow-lg text-white min-w-80 max-w-sm select-none bg-radial-[at_80%_15%] from-fuchsia-300 via-pink-500 to-pink-800 dark:from-fuchsia-900 dark:via-pink-800 dark:to-pink-950 to-90%`}
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
            <span className="text-white/70 text-s">Artist #{index + 1}</span>
          </div>
          <h3 className="text-lg font-bold leading-tight dark:text-slate-200">
            {artist.name}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed dark:text-slate-300">
            {artist.playcount} plays
          </p>
        </div>
        <div className="flex items-center justify-end shrink-0">
          <img
            src={artist.image?.find(image => image.size === 'large')?.['#text']}
            alt={artist.name}
            className="w-20 h-20 rounded-md"
          />
        </div>
      </div>
    </motion.div>
  )
}

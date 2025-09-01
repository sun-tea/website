import { motion } from 'framer-motion'

interface NowPlayingIndicatorProps {
  className?: string
  showText?: boolean
}

export function NowPlayingIndicator({
  className = '',
  showText = true,
}: NowPlayingIndicatorProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-end gap-0.5 h-5">
        <motion.div
          className="w-0.5 bg-green-400 rounded-full"
          animate={{
            height: ['8px', '16px', '8px'],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0,
          }}
        />
        <motion.div
          className="w-0.5 bg-green-400 rounded-full"
          animate={{
            height: ['12px', '20px', '12px'],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0.2,
          }}
        />
        <motion.div
          className="w-0.5 bg-green-400 rounded-full"
          animate={{
            height: ['8px', '16px', '8px'],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0.4,
          }}
        />
      </div>
      {showText && (
        <span className="text-green-400 font-medium ml-1">Now Playing</span>
      )}
    </div>
  )
}

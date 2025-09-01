import React, { RefObject, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type Props = {
  onBringToFront: (cardId: number) => void
  zIndex: number
  dragConstraintsRef?: RefObject<HTMLDivElement | null>
}

export function DraggableArea<T extends { name?: string; playcount?: string }>({
  items,
  title,
  renderCard,
}: {
  items: T[]
  title: string
  renderCard: (item: T, index: number, props: Props) => React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showAll, setShowAll] = useState(false)
  const [cardOrder, setCardOrder] = useState(items.map((_, id) => id))
  const displayedItems = showAll ? items : items.slice(0, 5)

  const bringToFront = (cardId: number) => {
    setCardOrder(prevOrder => {
      const newOrder = prevOrder.filter(id => id !== cardId)
      return [cardId, ...newOrder] // Put the dragged card at the beginning (highest z-index)
    })
  }

  const getZIndex = (cardId: number) => {
    return cardOrder.length - cardOrder.indexOf(cardId)
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-slate-300">
        {title}
      </h3>
      <div className="bg-gradient-to-br from-slate-900/50 via-purple-900/50 to-slate-900/50 p-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-96 mb-16" ref={containerRef}>
            <AnimatePresence>
              {displayedItems.map((item, index) => (
                <div key={index}>
                  {renderCard(item, index, {
                    onBringToFront: bringToFront,
                    zIndex: getZIndex(index),
                    dragConstraintsRef: containerRef,
                  })}
                </div>
              ))}
            </AnimatePresence>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-3xl -z-10"></div>
          </div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20 transition-colors"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

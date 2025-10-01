import React from 'react'

/**
 * Ensures cards stay within container bounds when "Show More" is clicked
 */

export interface CardPosition {
  x: number
  y: number
}

export interface PositioningConfig {
  cardWidth: number
  cardHeight: number
  containerWidth: number
  containerHeight: number
  overlapFactor: number
  randomOffsetRange: number
  organicCardLimit: number
}

const DEFAULT_CONFIG: PositioningConfig = {
  cardWidth: 320, // min-w-80 = 320px
  cardHeight: 120, // Approximate card height
  containerWidth: 1152, // max-w-6xl = 1152px
  containerHeight: 500, // h-[500px]
  overlapFactor: 0.6, // 60% overlap for natural stacking
  randomOffsetRange: 20, // Random offset range for organic positioning
  organicCardLimit: 5, // First 5 cards get organic positioning
}

export function calculateCardPosition(
  index: number,
  customPosition: CardPosition = { x: 0, y: 0 },
  config: Partial<PositioningConfig> = {},
  containerRef?: React.RefObject<HTMLDivElement | null>
): CardPosition {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  // Get actual container dimensions if available
  let actualContainerWidth = finalConfig.containerWidth
  let actualContainerHeight = finalConfig.containerHeight

  if (containerRef?.current) {
    const rect = containerRef.current.getBoundingClientRect()
    actualContainerWidth = rect.width
    actualContainerHeight = rect.height
  }

  const {
    cardWidth,
    cardHeight,
    overlapFactor,
    randomOffsetRange,
    organicCardLimit,
  } = finalConfig

  // Calculate grid position with better spacing
  const availableWidth = actualContainerWidth - 40 // Account for padding
  const cardsPerRow = Math.floor(availableWidth / (cardWidth * overlapFactor))
  const row = Math.floor(index / cardsPerRow)
  const col = index % cardsPerRow

  // Base position with overlap and better centering
  const baseX = 20 + col * (cardWidth * overlapFactor)
  const baseY = 20 + row * (cardHeight * 0.8) // Reduced vertical spacing

  // Add randomness for first few cards (organic positioning)
  const randomOffset =
    index < organicCardLimit
      ? {
          x: (Math.random() - 0.5) * randomOffsetRange,
          y: (Math.random() - 0.5) * randomOffsetRange,
        }
      : { x: 0, y: 0 }

  // Calculate final position with bounds checking
  const maxX = actualContainerWidth - cardWidth - 20 // Leave 20px margin on right
  const maxY = actualContainerHeight - cardHeight - 20 // Leave 20px margin on bottom

  const finalX = Math.min(baseX + randomOffset.x + customPosition.x, maxX)
  const finalY = Math.min(baseY + randomOffset.y + customPosition.y, maxY)

  return {
    x: Math.max(0, finalX), // Ensure we don't go negative
    y: Math.max(0, finalY),
  }
}

export function getDragConstraints(
  containerRef: React.RefObject<HTMLDivElement | null> | undefined,
  config: Partial<PositioningConfig> = {}
) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  if (containerRef?.current) {
    const rect = containerRef.current.getBoundingClientRect()
    return {
      left: 0, // Start from left edge of container
      right: rect.width - finalConfig.cardWidth, // End at right edge minus card width
      top: 0, // Start from top edge of container
      bottom: rect.height - finalConfig.cardHeight, // End at bottom edge minus card height
    }
  }

  return {
    left: 0,
    right: finalConfig.containerWidth - finalConfig.cardWidth,
    top: 0,
    bottom: finalConfig.containerHeight - finalConfig.cardHeight,
  }
}

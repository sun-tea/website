import { describe, it, expect } from 'vitest'
import {
  calculateCardPosition,
  getDragConstraints,
  type PositioningConfig,
} from './cardPositioning'

describe('cardPositioning', () => {
  describe('calculateCardPosition', () => {
    const testConfig: Partial<PositioningConfig> = {
      cardWidth: 320,
      cardHeight: 120,
      containerWidth: 1152,
      containerHeight: 500,
      overlapFactor: 0.6,
      randomOffsetRange: 20,
      organicCardLimit: 5,
    }

    it('calculates position for first card', () => {
      const position = calculateCardPosition(0, { x: 0, y: 0 }, testConfig)

      expect(position.x).toBeGreaterThanOrEqual(0)
      expect(position.y).toBeGreaterThanOrEqual(0)
      expect(position.x).toBeLessThanOrEqual(1152 - 320)
      expect(position.y).toBeLessThanOrEqual(500 - 120)
    })

    it('calculates position for subsequent cards', () => {
      const position = calculateCardPosition(1, { x: 0, y: 0 }, testConfig)

      expect(position.x).toBeGreaterThanOrEqual(0)
      expect(position.y).toBeGreaterThanOrEqual(0)
    })

    it('applies custom position offset', () => {
      const customPosition = { x: 50, y: 30 }
      const position = calculateCardPosition(0, customPosition, testConfig)

      // Position should be influenced by custom offset
      expect(position.x).toBeGreaterThanOrEqual(customPosition.x)
      expect(position.y).toBeGreaterThanOrEqual(customPosition.y)
    })

    it('respects container bounds', () => {
      const position = calculateCardPosition(100, { x: 0, y: 0 }, testConfig)

      expect(position.x).toBeLessThanOrEqual(1152 - 320)
      expect(position.y).toBeLessThanOrEqual(500 - 120)
    })

    it('ensures positions are never negative', () => {
      const negativeOffset = { x: -1000, y: -1000 }
      const position = calculateCardPosition(0, negativeOffset, testConfig)

      expect(position.x).toBeGreaterThanOrEqual(0)
      expect(position.y).toBeGreaterThanOrEqual(0)
    })
  })

  describe('getDragConstraints', () => {
    const testConfig: Partial<PositioningConfig> = {
      cardWidth: 320,
      cardHeight: 120,
      containerWidth: 1152,
      containerHeight: 500,
    }

    it('returns constraints based on config when no container ref', () => {
      const constraints = getDragConstraints(undefined, testConfig)

      expect(constraints.left).toBe(0)
      expect(constraints.top).toBe(0)
      expect(constraints.right).toBe(1152 - 320)
      expect(constraints.bottom).toBe(500 - 120)
    })

    it('ensures right constraint accounts for card width', () => {
      const constraints = getDragConstraints(undefined, testConfig)

      expect(constraints.right).toBeLessThan(testConfig.containerWidth!)
      expect(constraints.right).toBe(
        testConfig.containerWidth! - testConfig.cardWidth!,
      )
    })

    it('ensures bottom constraint accounts for card height', () => {
      const constraints = getDragConstraints(undefined, testConfig)

      expect(constraints.bottom).toBeLessThan(testConfig.containerHeight!)
      expect(constraints.bottom).toBe(
        testConfig.containerHeight! - testConfig.cardHeight!,
      )
    })
  })
})

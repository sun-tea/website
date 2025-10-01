import { describe, it, expect } from 'vitest'
import { getDifficultyColor, getCategoryEmoji } from './recipeUtils'

describe('recipeUtils', () => {
  describe('getDifficultyColor', () => {
    it('returns green for beginner difficulty', () => {
      expect(getDifficultyColor('beginner')).toBe('bg-green-100 text-green-800')
    })

    it('returns yellow for easy difficulty', () => {
      expect(getDifficultyColor('easy')).toBe('bg-yellow-100 text-yellow-800')
    })

    it('returns orange for medium difficulty', () => {
      expect(getDifficultyColor('medium')).toBe(
        'bg-orange-100 text-orange-800',
      )
    })

    it('returns gray for unknown difficulty', () => {
      expect(getDifficultyColor('hard')).toBe('bg-gray-100 text-gray-800')
      expect(getDifficultyColor('')).toBe('bg-gray-100 text-gray-800')
    })
  })

  describe('getCategoryEmoji', () => {
    it('returns sunrise emoji for breakfast', () => {
      expect(getCategoryEmoji('breakfast')).toBe('🌅')
    })

    it('returns salad emoji for lunch', () => {
      expect(getCategoryEmoji('lunch')).toBe('🥗')
    })

    it('returns plate emoji for dinner', () => {
      expect(getCategoryEmoji('dinner')).toBe('🍽️')
    })

    it('returns popcorn emoji for snack', () => {
      expect(getCategoryEmoji('snack')).toBe('🍿')
    })

    it('returns fork and knife emoji for unknown category', () => {
      expect(getCategoryEmoji('dessert')).toBe('🍴')
      expect(getCategoryEmoji('')).toBe('🍴')
    })
  })
})

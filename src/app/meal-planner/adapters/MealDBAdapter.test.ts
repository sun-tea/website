import { describe, it, expect } from 'vitest'
import { MealDBAdapter } from './MealDBAdapter'
import type { MealDBMeal } from '../services/schemas'

describe('MealDBAdapter', () => {
  const adapter = new MealDBAdapter()

  const mockMeal: MealDBMeal = {
    idMeal: '123',
    strMeal: 'Test Pasta',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strInstructions:
      'Boil water. Cook pasta for 10 minutes. Add sauce. Serve hot.',
    strMealThumb: 'https://example.com/pasta.jpg',
    strTags: 'Italian,Easy',
    strIngredient1: 'Pasta',
    strIngredient2: 'Tomato Sauce',
    strIngredient3: 'Olive Oil',
    strMeasure1: '200g',
    strMeasure2: '100ml',
    strMeasure3: '2 tbsp',
  }

  describe('transform', () => {
    it('transforms MealDB meal to Recipe format', () => {
      const recipe = adapter.transform(mockMeal)

      expect(recipe.id).toBe('mealdb-123')
      expect(recipe.name).toBe('Test Pasta')
      expect(recipe.source).toBe('mealdb')
      expect(recipe.image).toBe('https://example.com/pasta.jpg')
    })

    it('extracts ingredients with measurements', () => {
      const recipe = adapter.transform(mockMeal)

      expect(recipe.ingredients).toContain('200g Pasta')
      expect(recipe.ingredients).toContain('100ml Tomato Sauce')
      expect(recipe.ingredients).toContain('2 tbsp Olive Oil')
    })

    it('parses instructions into array', () => {
      const recipe = adapter.transform(mockMeal)

      expect(recipe.instructions).toBeInstanceOf(Array)
      expect(recipe.instructions.length).toBeGreaterThan(0)
    })

    it('extracts tags from meal', () => {
      const recipe = adapter.transform(mockMeal)

      expect(recipe.tags).toContain('pasta')
      expect(recipe.tags).toContain('italian')
    })

    it('calculates difficulty based on instructions and ingredients', () => {
      const recipe = adapter.transform(mockMeal)

      expect(recipe.difficulty).toMatch(/beginner|easy|medium/)
    })

    it('estimates cook time from instructions', () => {
      const recipe = adapter.transform(mockMeal)

      expect(recipe.cookTime).toBeGreaterThan(0)
      expect(typeof recipe.cookTime).toBe('number')
    })
  })

  describe('extractIngredients', () => {
    it('handles meals with no ingredients', () => {
      const emptyMeal: MealDBMeal = {
        ...mockMeal,
        strIngredient1: null,
        strIngredient2: null,
        strIngredient3: null,
      }

      const recipe = adapter.transform(emptyMeal)
      expect(recipe.ingredients).toEqual([])
    })

    it('handles ingredients without measurements', () => {
      const mealWithoutMeasures: MealDBMeal = {
        ...mockMeal,
        strIngredient1: 'Salt',
        strMeasure1: null,
      }

      const recipe = adapter.transform(mealWithoutMeasures)
      expect(recipe.ingredients).toContain('Salt')
    })
  })

  describe('parseInstructions', () => {
    it('splits instructions by newlines', () => {
      const mealWithSteps: MealDBMeal = {
        ...mockMeal,
        strInstructions: 'Step 1: Do this\nStep 2: Do that\nStep 3: Finish',
      }

      const recipe = adapter.transform(mealWithSteps)
      expect(recipe.instructions.length).toBeGreaterThanOrEqual(3)
    })

    it('removes step numbers from instructions', () => {
      const mealWithNumbers: MealDBMeal = {
        ...mockMeal,
        strInstructions: '1. First step\n2. Second step',
      }

      const recipe = adapter.transform(mealWithNumbers)
      expect(recipe.instructions[0]).not.toMatch(/^1\./)
    })

    it('handles empty instructions', () => {
      const mealNoInstructions: MealDBMeal = {
        ...mockMeal,
        strInstructions: undefined,
      }

      const recipe = adapter.transform(mealNoInstructions)
      expect(recipe.instructions).toEqual([])
    })
  })

  describe('calculateDifficulty', () => {
    it('returns beginner for simple recipes', () => {
      const simpleMeal: MealDBMeal = {
        ...mockMeal,
        strInstructions: 'Mix and serve.',
        strIngredient1: 'Ingredient 1',
        strIngredient2: 'Ingredient 2',
      }

      const recipe = adapter.transform(simpleMeal)
      expect(recipe.difficulty).toBe('beginner')
    })

    it('returns medium for complex recipes', () => {
      const complexMeal: MealDBMeal = {
        ...mockMeal,
        strInstructions: 'a'.repeat(500), // Long instructions
        strIngredient1: 'Ing1',
        strIngredient2: 'Ing2',
        strIngredient3: 'Ing3',
        strIngredient4: 'Ing4',
        strIngredient5: 'Ing5',
        strIngredient6: 'Ing6',
        strIngredient7: 'Ing7',
        strIngredient8: 'Ing8',
        strIngredient9: 'Ing9',
        strIngredient10: 'Ing10',
        strIngredient11: 'Ing11',
        strIngredient12: 'Ing12',
        strIngredient13: 'Ing13',
      }

      const recipe = adapter.transform(complexMeal)
      expect(recipe.difficulty).toBe('medium')
    })
  })

  describe('estimateCookTime', () => {
    it('extracts time from instructions mentioning minutes', () => {
      const mealWithTime: MealDBMeal = {
        ...mockMeal,
        strInstructions: 'Cook for 25 minutes',
      }

      const recipe = adapter.transform(mealWithTime)
      expect(recipe.cookTime).toBeGreaterThanOrEqual(25)
    })

    it('converts hours to minutes', () => {
      const mealWithHours: MealDBMeal = {
        ...mockMeal,
        strInstructions: 'Bake for 2 hours',
      }

      const recipe = adapter.transform(mealWithHours)
      expect(recipe.cookTime).toBeGreaterThanOrEqual(120)
    })

    it('returns default time when no time mentioned', () => {
      const mealNoTime: MealDBMeal = {
        ...mockMeal,
        strInstructions: 'Mix ingredients and serve',
      }

      const recipe = adapter.transform(mealNoTime)
      expect(recipe.cookTime).toBeGreaterThan(0)
    })
  })
})

import { describe, it, expect } from 'vitest'
import { SpoonacularAdapter } from './SpoonacularAdapter'
import type { SpoonacularRecipe } from '../services/schemas'

describe('SpoonacularAdapter', () => {
  const adapter = new SpoonacularAdapter()

  const mockRecipe: SpoonacularRecipe = {
    id: 456,
    title: 'Spicy Chicken Curry',
    readyInMinutes: 45,
    image: 'https://example.com/curry.jpg',
    summary: '<p>Delicious <b>curry</b> recipe</p>',
    dishTypes: ['dinner', 'main course'],
    extendedIngredients: [
      { original: '500g chicken breast' },
      { original: '2 cups coconut milk' },
      { original: '3 tbsp curry powder' },
    ],
    analyzedInstructions: [
      {
        steps: [
          { step: 'Cut chicken into pieces', number: 1 },
          { step: 'Heat oil in pan', number: 2 },
          { step: 'Cook chicken until golden', number: 3 },
        ],
      },
    ],
  }

  describe('transform', () => {
    it('transforms Spoonacular recipe to Recipe format', () => {
      const recipe = adapter.transform(mockRecipe)

      expect(recipe.id).toBe('spoon-456')
      expect(recipe.name).toBe('Spicy Chicken Curry')
      expect(recipe.source).toBe('spoonacular')
      expect(recipe.image).toBe('https://example.com/curry.jpg')
    })

    it('uses readyInMinutes for cookTime', () => {
      const recipe = adapter.transform(mockRecipe)

      expect(recipe.cookTime).toBe(45)
    })

    it('defaults to 30 minutes when readyInMinutes is missing', () => {
      const recipeNoTime: SpoonacularRecipe = {
        ...mockRecipe,
        readyInMinutes: undefined,
      }

      const recipe = adapter.transform(recipeNoTime)
      expect(recipe.cookTime).toBe(30)
    })

    it('extracts ingredients from extendedIngredients', () => {
      const recipe = adapter.transform(mockRecipe)

      expect(recipe.ingredients).toContain('500g chicken breast')
      expect(recipe.ingredients).toContain('2 cups coconut milk')
      expect(recipe.ingredients).toContain('3 tbsp curry powder')
    })

    it('parses instructions from analyzedInstructions', () => {
      const recipe = adapter.transform(mockRecipe)

      expect(recipe.instructions).toHaveLength(3)
      expect(recipe.instructions[0]).toBe('Cut chicken into pieces')
      expect(recipe.instructions[1]).toBe('Heat oil in pan')
      expect(recipe.instructions[2]).toBe('Cook chicken until golden')
    })

    it('strips HTML from summary description', () => {
      const recipe = adapter.transform(mockRecipe)

      expect(recipe.description).not.toContain('<p>')
      expect(recipe.description).not.toContain('<b>')
      expect(recipe.description).toContain('Delicious')
      expect(recipe.description).toContain('curry')
    })

    it('uses dish types as tags', () => {
      const recipe = adapter.transform(mockRecipe)

      expect(recipe.tags).toContain('dinner')
      expect(recipe.tags).toContain('main course')
    })
  })

  describe('calculateDifficulty', () => {
    it('returns beginner for quick recipes with few steps', () => {
      const quickRecipe: SpoonacularRecipe = {
        ...mockRecipe,
        readyInMinutes: 15,
        analyzedInstructions: [
          {
            steps: [
              { step: 'Mix', number: 1 },
              { step: 'Serve', number: 2 },
            ],
          },
        ],
      }

      const recipe = adapter.transform(quickRecipe)
      expect(recipe.difficulty).toBe('beginner')
    })

    it('returns easy for moderate recipes', () => {
      const moderateRecipe: SpoonacularRecipe = {
        ...mockRecipe,
        readyInMinutes: 30,
        analyzedInstructions: [
          {
            steps: Array(7).fill({ step: 'Do something', number: 1 }),
          },
        ],
      }

      const recipe = adapter.transform(moderateRecipe)
      expect(recipe.difficulty).toBe('easy')
    })

    it('returns medium for complex recipes', () => {
      const complexRecipe: SpoonacularRecipe = {
        ...mockRecipe,
        readyInMinutes: 60,
        analyzedInstructions: [
          {
            steps: Array(12).fill({ step: 'Do something', number: 1 }),
          },
        ],
      }

      const recipe = adapter.transform(complexRecipe)
      expect(recipe.difficulty).toBe('medium')
    })
  })

  describe('mapMealType', () => {
    it('maps breakfast types correctly', () => {
      const breakfastRecipe: SpoonacularRecipe = {
        ...mockRecipe,
        dishTypes: ['breakfast'],
      }

      const recipe = adapter.transform(breakfastRecipe)
      expect(recipe.category).toBe('breakfast')
    })

    it('maps meal types correctly', () => {
      const mealRecipe: SpoonacularRecipe = {
        ...mockRecipe,
        dishTypes: ['main course'],
      }

      const recipe = adapter.transform(mealRecipe)
      expect(recipe.category).toBe('meal')
    })

    it('maps snack types correctly', () => {
      const snackRecipe: SpoonacularRecipe = {
        ...mockRecipe,
        dishTypes: ['dessert'],
      }

      const recipe = adapter.transform(snackRecipe)
      expect(recipe.category).toBe('snack')
    })

    it('defaults to meal for unknown types', () => {
      const unknownRecipe: SpoonacularRecipe = {
        ...mockRecipe,
        dishTypes: ['unknown-type'],
      }

      const recipe = adapter.transform(unknownRecipe)
      expect(recipe.category).toBe('meal')
    })

    it('defaults to meal when no dish types provided', () => {
      const noTypeRecipe: SpoonacularRecipe = {
        ...mockRecipe,
        dishTypes: undefined,
      }

      const recipe = adapter.transform(noTypeRecipe)
      expect(recipe.category).toBe('meal')
    })
  })

  describe('parseSpoonInstructions', () => {
    it('handles missing analyzedInstructions', () => {
      const noInstructions: SpoonacularRecipe = {
        ...mockRecipe,
        analyzedInstructions: undefined,
      }

      const recipe = adapter.transform(noInstructions)
      expect(recipe.instructions).toEqual([])
    })

    it('handles empty steps array', () => {
      const emptySteps: SpoonacularRecipe = {
        ...mockRecipe,
        analyzedInstructions: [{ steps: [] }],
      }

      const recipe = adapter.transform(emptySteps)
      expect(recipe.instructions).toEqual([])
    })
  })

  describe('edge cases', () => {
    it('handles recipe with no ingredients', () => {
      const noIngredients: SpoonacularRecipe = {
        ...mockRecipe,
        extendedIngredients: undefined,
      }

      const recipe = adapter.transform(noIngredients)
      expect(recipe.ingredients).toEqual([])
    })

    it('handles recipe with no summary', () => {
      const noSummary: SpoonacularRecipe = {
        ...mockRecipe,
        summary: undefined,
      }

      const recipe = adapter.transform(noSummary)
      expect(recipe.description).toBe('Missing description. Yummy yum!')
    })

    it('handles recipe with empty tags', () => {
      const noTags: SpoonacularRecipe = {
        ...mockRecipe,
        dishTypes: undefined,
      }

      const recipe = adapter.transform(noTags)
      expect(recipe.tags).toEqual([])
    })
  })
})

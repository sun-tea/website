import {
  MealDBMeal,
  MealDBListResponseSchema,
  Recipe,
} from '../services/schemas'
import { RecipeAdapter } from '../types'

// Data transformation layer
export class MealDBAdapter implements RecipeAdapter {
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1'

  transform(meal: MealDBMeal): Recipe {
    return {
      id: `mealdb-${meal.idMeal}`,
      name: meal.strMeal,
      cookTime: this.estimateCookTime(meal.strInstructions), // Custom logic
      difficulty: this.calculateDifficulty(meal), // Custom logic
      category: this.mapCategory(meal.strCategory || ''),
      ingredients: this.extractIngredients(meal),
      instructions: this.parseInstructions(meal.strInstructions),
      protein: undefined,
      image: meal.strMealThumb,
      source: 'mealdb',
      tags: this.extractTags(meal),
      description: `${meal.strCategory || 'International'} recipe${meal.strArea ? ` from ${meal.strArea}` : ''}`,
    }
  }

  async fetchByCategory(category?: string): Promise<Recipe[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/filter.php?c=${category || ''}`
      )
      if (!response.ok) {
        throw new Error(`MealDB API error: ${response.status}`)
      }

      const rawData = await response.json()
      const validatedData = MealDBListResponseSchema.parse(rawData)

      if (!validatedData.meals) {
        return []
      }

      // For category queries, we need to fetch full details for each recipe
      const detailedRecipes = await Promise.all(
        validatedData.meals
          .slice(0, 12)
          .filter(meal => !!meal)
          .map(meal => this.fetchMealDetails(meal.idMeal))
      )

      return detailedRecipes.filter(recipe => recipe !== null) as Recipe[]
    } catch (error) {
      console.error('MealDB fetch error:', error)
      throw new Error(
        `Failed to fetch recipes from MealDB: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  private async fetchMealDetails(mealId: string): Promise<Recipe | null> {
    try {
      const response = await fetch(`${this.baseUrl}/lookup.php?i=${mealId}`)
      const rawData = await response.json()
      const validatedData = MealDBListResponseSchema.parse(rawData)

      if (!validatedData.meals?.[0]) {
        return null
      }

      return this.transform(validatedData.meals[0])
    } catch (error) {
      console.error(`Error fetching meal details for ${mealId}:`, error)
      return null
    }
  }

  async search(query: string): Promise<Recipe[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/search.php?s=${encodeURIComponent(query)}`
      )
      if (!response.ok) {
        throw new Error(`MealDB API error: ${response.status}`)
      }

      const rawData = await response.json()
      const validatedData = MealDBListResponseSchema.parse(rawData)

      if (!validatedData.meals) {
        return []
      }

      return validatedData.meals.map(meal => this.transform(meal))
    } catch (error) {
      console.error('MealDB search error:', error)
      throw new Error(
        `Failed to search recipes: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  private extractIngredients(meal: MealDBMeal): string[] {
    const ingredients: string[] = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof MealDBMeal] as string
      const measure = meal[`strMeasure${i}` as keyof MealDBMeal] as string

      if (ingredient?.trim()) {
        const fullIngredient = measure?.trim()
          ? `${measure.trim()} ${ingredient.trim()}`
          : ingredient.trim()
        ingredients.push(fullIngredient)
      }
    }
    return ingredients
  }

  private parseInstructions(instructions?: string): string[] {
    if (!instructions) return []

    return instructions
      .split(/\r?\n/)
      .map(step => step.trim())
      .filter(step => step.length > 0)
      .map(step => step.replace(/^\d+\.?\s*/, '')) // Remove step numbers
  }

  private mapCategory(category: string): Recipe['category'] {
    const categoryMap: Record<string, Recipe['category']> = {
      breakfast: 'breakfast',
      starter: 'snack',
      dessert: 'snack',
      side: 'snack',
      // more mappings to come
    }

    const lowerCategory = category.toLowerCase()
    return categoryMap[lowerCategory] || 'dinner'
  }

  private calculateDifficulty(meal: MealDBMeal): Recipe['difficulty'] {
    const instructionLength = meal.strInstructions?.length || 0
    const ingredientCount = this.extractIngredients(meal).length

    if (instructionLength < 200 && ingredientCount < 8) return 'beginner'
    if (instructionLength < 400 && ingredientCount < 12) return 'easy'
    return 'medium'
  }

  private estimateCookTime(instructions?: string): number {
    if (!instructions) return 30

    // Look for time mentions in instructions
    const timeRegex = /(\d+)\s*(minutes?|mins?|hours?|hrs?)/gi
    const matches = instructions.match(timeRegex)

    if (matches) {
      const times = matches.map(match => {
        const [, num, unit] =
          match.match(/(\d+)\s*(minutes?|mins?|hours?|hrs?)/i) || []
        const minutes =
          parseInt(num) *
          (unit.toLowerCase().includes('hour') ||
          unit.toLowerCase().includes('hr')
            ? 60
            : 1)
        return minutes
      })
      return Math.max(...times)
    }

    // Fallback based on instruction length
    const length = instructions.length
    if (length < 200) return 15
    if (length < 400) return 25
    if (length < 800) return 35
    return 45
  }

  private extractTags(meal: MealDBMeal): string[] {
    const tags: string[] = []

    if (meal.strCategory) tags.push(meal.strCategory.toLowerCase())
    if (meal.strArea) tags.push(meal.strArea.toLowerCase())

    if (meal.strTags) {
      const mealTags = meal.strTags
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0)
      tags.push(...mealTags)
    }

    return [...new Set(tags)] // Remove duplicates
  }
}

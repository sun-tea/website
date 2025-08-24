import {
  Recipe,
  SpoonacularListResponseSchema,
  SpoonacularRecipe,
  SpoonacularRecipeBulkResponse,
  SpoonacularRecipeBulkResponseSchema,
} from '../services/schemas'
import { RecipeAdapter } from '../types'

export class SpoonacularAdapter implements RecipeAdapter {
  private baseUrl = '/api/recipes/spoonacular'

  transform(meal: SpoonacularRecipe): Recipe {
    return {
      id: `spoon-${meal.id}`,
      name: meal.title,
      cookTime: meal.readyInMinutes || 30,
      difficulty: this.calculateDifficulty(meal),
      category: this.mapMealType(meal.dishTypes?.[0]),
      ingredients: meal.extendedIngredients?.map(ing => ing.original) || [],
      instructions: this.parseSpoonInstructions(meal.analyzedInstructions),
      image: meal.image,
      source: 'spoonacular',
      tags: [...(meal.dishTypes || [])],
      description:
        meal.summary?.replace(/<[^>]*>/g, '') ||
        'Missing description. Yummy yum!',
    }
  }

  async fetchByCategory(category: string): Promise<Recipe[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}?path=complexSearch&diet=${category}`
      )
      const rawData = await response.json()
      const validatedData = SpoonacularListResponseSchema.parse(rawData)

      if (!validatedData.results) {
        return []
      }

      const ids = validatedData.results
        .filter(meal => !!meal)
        .map(meal => meal.id)
      const recipes = await this.getRecipeInformationBulk(ids)
      return recipes?.map(recipe => this.transform(recipe)) || []
    } catch (error) {
      console.error('Spoonacular fetch error:', error)
      throw new Error(
        `Failed to fetch recipes from Spoonacular: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  private async getRecipeInformationBulk(
    ids: number[]
  ): Promise<SpoonacularRecipeBulkResponse | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}?path=informationBulk&ids=${ids.join(',')}`
      )
      const rawData = await response.json()
      const validatedData = SpoonacularRecipeBulkResponseSchema.parse(rawData)
      return validatedData
    } catch (error) {
      console.error(
        `Error fetching meal details for recipes ids ${ids}:`,
        error
      )
      return null
    }
  }

  async search(query: string): Promise<Recipe[]> {
    const response = await fetch(`${this.baseUrl}?query=${query}`)
    const data = await response.json()
    return data || []
  }

  private calculateDifficulty(recipe: SpoonacularRecipe): Recipe['difficulty'] {
    const time = recipe.readyInMinutes || 30
    const steps = recipe.analyzedInstructions?.[0]?.steps?.length || 5

    if (time <= 20 && steps <= 5) return 'beginner'
    if (time <= 35 && steps <= 8) return 'easy'
    return 'medium'
  }

  private mapMealType(dishType?: string): Recipe['category'] {
    if (!dishType) return 'meal'

    const breakfast = ['breakfast', 'brunch', 'morning']
    const meal = ['lunch', 'main course', 'salad', 'soup', 'side']
    const snack = ['snack', 'dessert', 'appetizer']
    const drink = ['drink', 'cocktail', 'beer', 'wine', 'soda', 'juice']

    const type = dishType.toLowerCase()
    if (breakfast.some(t => type.includes(t))) return 'breakfast'
    if (meal.some(t => type.includes(t))) return 'meal'
    if (snack.some(t => type.includes(t))) return 'snack'
    if (drink.some(t => type.includes(t))) return 'drink'
    return 'meal'
  }

  private parseSpoonInstructions(
    analyzedInstructions: SpoonacularRecipe['analyzedInstructions']
  ): string[] {
    if (!analyzedInstructions?.[0]?.steps) return []

    return analyzedInstructions[0].steps.map(
      (step: SpoonacularRecipe['analyzedInstructions'][0]['steps'][0]) =>
        step.step
    )
  }
}

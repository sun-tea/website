import { Recipe, SpoonacularMeal } from '../services/schemas'
import { RecipeAdapter } from '../types'

export class SpoonacularAdapter implements RecipeAdapter {
  private baseUrl = `https://api.spoonacular.com/recipes/`
  private key = `?apiKey=${process.env.SPOONACULAR_API_KEY}&`

  transform(meal: SpoonacularMeal): Recipe {
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
        meal.summary?.replace(/<[^>]*>/g, '').slice(0, 200) ||
        'Yum yummy recipe',
    }
  }

  async fetchByCategory(category: string): Promise<Recipe[]> {
    const response = await fetch(
      `${this.baseUrl}/complexSearch${this.key}diet=${category}`
    )
    const data = await response.json()
    return data || []
  }

  async search(query: string): Promise<Recipe[]> {
    const response = await fetch(
      `${this.baseUrl}/complexSearch${this.key}query=${query}`
    )
    const data = await response.json()
    return data || []
  }

  private calculateDifficulty(recipe: SpoonacularMeal): Recipe['difficulty'] {
    const time = recipe.readyInMinutes || 30
    const steps = recipe.analyzedInstructions?.[0]?.steps?.length || 5

    if (time <= 20 && steps <= 5) return 'beginner'
    if (time <= 35 && steps <= 8) return 'easy'
    return 'medium'
  }

  private mapMealType(dishType?: string): Recipe['category'] {
    if (!dishType) return 'dinner'

    const breakfast = ['breakfast', 'brunch']
    const lunch = ['lunch', 'salad', 'soup']
    const snack = ['snack', 'dessert', 'appetizer']

    const type = dishType.toLowerCase()
    if (breakfast.some(t => type.includes(t))) return 'breakfast'
    if (lunch.some(t => type.includes(t))) return 'lunch'
    if (snack.some(t => type.includes(t))) return 'snack'
    return 'dinner'
  }

  private parseSpoonInstructions(
    analyzedInstructions: SpoonacularMeal['analyzedInstructions']
  ): string[] {
    if (!analyzedInstructions?.[0]?.steps) return []

    return analyzedInstructions[0].steps.map(
      (step: SpoonacularMeal['analyzedInstructions'][0]['steps'][0]) =>
        step.step
    )
  }
}

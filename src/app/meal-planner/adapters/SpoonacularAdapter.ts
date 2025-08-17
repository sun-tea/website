import { Recipe, RecipeAdapter } from '../types'

// adapters/SpoonacularAdapter.ts
export class SpoonacularAdapter implements RecipeAdapter {
  private apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY
  private baseUrl = 'https://api.spoonacular.com/recipes'

  transform(spoonData: any): Recipe {
    return {
      id: `spoon-${spoonData.id}`,
      name: spoonData.title,
      cookTime: spoonData.readyInMinutes || 30,
      difficulty: this.calculateDifficulty(spoonData),
      category: this.mapMealType(spoonData.dishTypes?.[0]),
      ingredients:
        spoonData.extendedIngredients?.map((ing: any) => ing.original) || [],
      instructions: this.parseSpoonInstructions(spoonData.analyzedInstructions),
      calories: spoonData.nutrition?.nutrients?.find(
        (n: any) => n.name === 'Calories'
      )?.amount,
      protein: spoonData.nutrition?.nutrients?.find(
        (n: any) => n.name === 'Protein'
      )?.amount,
      image: spoonData.image,
      source: 'spoonacular',
      tags: [...(spoonData.dishTypes || []), ...(spoonData.cuisines || [])],
      description:
        spoonData.summary?.replace(/<[^>]*>/g, '').slice(0, 200) ||
        'Delicious recipe',
    }
  }

  async fetchByCategory(category: string): Promise<any[]> {
    const response = await fetch(
      `${this.baseUrl}/complexSearch?type=${category}&apiKey=${this.apiKey}&addRecipeInformation=true&number=12`
    )
    const data = await response.json()
    return data.results || []
  }

  async search(query: string): Promise<any[]> {
    const response = await fetch(
      `${this.baseUrl}/complexSearch?query=${query}&apiKey=${this.apiKey}&addRecipeInformation=true&number=12`
    )
    const data = await response.json()
    return data.results || []
  }

  private calculateDifficulty(recipe: any): Recipe['difficulty'] {
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

  private parseSpoonInstructions(analyzedInstructions: any[]): string[] {
    if (!analyzedInstructions?.[0]?.steps) return []

    return analyzedInstructions[0].steps.map((step: any) => step.step)
  }
}

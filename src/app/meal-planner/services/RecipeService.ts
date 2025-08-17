import { MealDBAdapter } from '../adapters/MealDBAdapter'
import { SpoonacularAdapter } from '../adapters/SpoonacularAdapter'
import { Recipe, RecipeAdapter } from '../types'

export class RecipeService {
  private adapters: Map<string, RecipeAdapter> = new Map()

  constructor() {
    this.adapters.set('mealdb', new MealDBAdapter())
    this.adapters.set('spoonacular', new SpoonacularAdapter())
    // Add more adapters as needed
  }

  async searchRecipes(
    query: string,
    sources: string[] = ['mealdb']
  ): Promise<Recipe[]> {
    const allRecipes: Recipe[] = []

    for (const source of sources) {
      const adapter = this.adapters.get(source)
      if (!adapter) continue

      try {
        const rawData = await adapter.search(query)
        const transformedRecipes = rawData.map(data => adapter.transform(data))
        allRecipes.push(...transformedRecipes)
      } catch (error) {
        console.error(`Error fetching from ${source}:`, error)
        // Continue with other sources
      }
    }

    return this.deduplicateRecipes(allRecipes)
  }

  async getRecipesByCategory(
    category: string,
    sources: string[] = ['mealdb']
  ): Promise<Recipe[]> {
    const allRecipes: Recipe[] = []

    for (const source of sources) {
      const adapter = this.adapters.get(source)
      if (!adapter) continue

      try {
        const rawData = await adapter.fetchByCategory(category)
        const transformedRecipes = rawData.map(data => adapter.transform(data))
        allRecipes.push(...transformedRecipes)
      } catch (error) {
        console.error(`Error fetching from ${source}:`, error)
      }
    }

    return this.deduplicateRecipes(allRecipes)
  }

  private deduplicateRecipes(recipes: Recipe[]): Recipe[] {
    const seen = new Set<string>()
    return recipes.filter(recipe => {
      const key = recipe.name.toLowerCase().replace(/\s+/g, '')
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }
}

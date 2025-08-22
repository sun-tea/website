import { Recipe } from './services/schemas'

export interface RecipeAdapter {
  transform(rawData: Record<string, unknown>): Recipe
  fetchByCategory(category: string): Promise<Recipe[]>
  search(query: string): Promise<Recipe[]>
}

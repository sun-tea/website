export interface Recipe {
  id: string
  name: string
  cookTime: number
  difficulty: 'beginner' | 'easy' | 'medium'
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  ingredients: string[]
  instructions: string[]
  calories?: number
  protein?: number
  image?: string
  source: 'mealdb' | 'spoonacular' | 'edamam' | 'manual'
  tags: string[]
  description: string
}

export interface RecipeAdapter {
  transform(rawData: any): Recipe
  fetchByCategory(category: string): Promise<any[]>
  search(query: string): Promise<any[]>
}

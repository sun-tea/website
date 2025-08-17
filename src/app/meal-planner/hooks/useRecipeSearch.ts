import { useQuery } from '@tanstack/react-query'
import { RecipeService } from '../services/RecipeService'

export function useRecipeSearch(query: string, sources: string[] = ['mealdb']) {
  const recipeService = new RecipeService()

  return useQuery({
    queryKey: ['recipe-search', query, sources],
    queryFn: () => recipeService.searchRecipes(query, sources),
    enabled: query.length > 2, // Only search with 3+ characters
  })
}

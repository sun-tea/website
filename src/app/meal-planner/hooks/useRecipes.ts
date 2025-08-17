import { useQuery } from '@tanstack/react-query'
import { RecipeService } from '../services/RecipeService'

export function useRecipes(category?: string, sources: string[] = ['mealdb']) {
  const recipeService = new RecipeService()

  return useQuery({
    queryKey: ['recipes', category, sources],
    queryFn: () =>
      category
        ? recipeService.getRecipesByCategory(category, sources)
        : recipeService.searchRecipes('', sources),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

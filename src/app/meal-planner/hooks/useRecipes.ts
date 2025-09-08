import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { RecipeService } from '../services/RecipeService'
import { Recipe } from '../services/schemas'

const recipeService = new RecipeService()

export function useRecipesByCategory(
  category: string
): UseQueryResult<Recipe[], Error> {
  return useQuery({
    queryKey: ['recipes', 'category', category],
    queryFn: () =>
      recipeService.getRecipesByCategory(category, ['mealdb', 'spoonacular']),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: false,
  })
}

export function useRecipeSearch(
  query: string
): UseQueryResult<Recipe[], Error> {
  return useQuery({
    queryKey: ['recipes', 'search', query],
    queryFn: () => recipeService.searchRecipes(query),
    enabled: query.trim().length >= 2, // Only search with 2+ characters
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1, // Less retries for search
  })
}

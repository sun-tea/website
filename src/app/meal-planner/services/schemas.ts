import { z } from 'zod'

// Our internal Recipe schema (single source of truth)
export const RecipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  cookTime: z.number(),
  difficulty: z.enum(['beginner', 'easy', 'medium']),
  category: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  protein: z.number().optional(),
  image: z.string().optional(),
  source: z.enum(['mealdb', 'spoonacular', 'edamam', 'manual']),
  tags: z.array(z.string()),
  description: z.string(),
})

export type Recipe = z.infer<typeof RecipeSchema>

// MealDB API response schema
export const MealDBListResponseSchema = z.object({
  meals: z
    .array(
      z.object({
        idMeal: z.string(),
        strMeal: z.string(),
        strCategory: z.string().optional(),
        strArea: z.string().optional(),
        strInstructions: z.string().optional(),
        strMealThumb: z.string().optional(),
        strTags: z.string().optional().nullable(),
        // Ingredients (MealDB has up to 20 ingredient/measure pairs)
        strIngredient1: z.string().optional(),
        strIngredient2: z.string().optional(),
        strIngredient3: z.string().optional(),
        strIngredient4: z.string().optional(),
        strIngredient5: z.string().optional(),
        strIngredient6: z.string().optional(),
        strIngredient7: z.string().optional(),
        strIngredient8: z.string().optional(),
        strIngredient9: z.string().optional(),
        strIngredient10: z.string().optional(),
        strIngredient11: z.string().optional(),
        strIngredient12: z.string().optional(),
        strIngredient13: z.string().optional(),
        strIngredient14: z.string().optional(),
        strIngredient15: z.string().optional(),
        strIngredient16: z.string().optional(),
        strIngredient17: z.string().optional(),
        strIngredient18: z.string().optional(),
        strIngredient19: z.string().optional(),
        strIngredient20: z.string().optional(),
        strMeasure1: z.string().optional(),
        strMeasure2: z.string().optional(),
        strMeasure3: z.string().optional(),
        strMeasure4: z.string().optional(),
        strMeasure5: z.string().optional(),
        strMeasure6: z.string().optional(),
        strMeasure7: z.string().optional(),
        strMeasure8: z.string().optional(),
        strMeasure9: z.string().optional(),
        strMeasure10: z.string().optional(),
        strMeasure11: z.string().optional(),
        strMeasure12: z.string().optional(),
        strMeasure13: z.string().optional(),
        strMeasure14: z.string().optional(),
        strMeasure15: z.string().optional(),
        strMeasure16: z.string().optional(),
        strMeasure17: z.string().optional(),
        strMeasure18: z.string().optional(),
        strMeasure19: z.string().optional(),
        strMeasure20: z.string().optional(),
      })
    )
    .nullable(),
})

export type MealDBListResponse = z.infer<typeof MealDBListResponseSchema>
export type MealDBMeal = NonNullable<MealDBListResponse['meals']>[0]

export const SpoonacularListResponseSchema = z.object({
  offset: z.number(),
  number: z.number(),
  results: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      image: z.string(),
      imageType: z.string(),
    })
  ),
  totalResults: z.number(),
})

export type SpoonacularListResponse = z.infer<
  typeof SpoonacularListResponseSchema
>

export const SpoonacularItemResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  summary: z.string(),
  image: z.string(),
  servings: z.number(),
  readyInMinutes: z.number(),
  cookingMinutes: z.number(),
  preparationMinutes: z.number(),
  sourceName: z.string(),
  sourceUrl: z.string(),
  spoonacularSourceUrl: z.string(),
  analyzedInstructions: z.array(
    z.object({
      name: z.string(),
      steps: z.array(
        z.object({
          number: z.number(),
          step: z.string(),
        })
      ),
    })
  ),
  glutenFree: z.boolean(),
  instructions: z.string(),
  vegan: z.boolean(),
  vegetarian: z.boolean(),
  whole30: z.boolean(),
  dishTypes: z.array(z.string()),
  extendedIngredients: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      original: z.string(),
      image: z.string(),
      measures: z.object({
        metric: z.object({
          amount: z.number(),
          unitShort: z.string(),
        }),
      }),
    })
  ),
})

export type SpoonacularMeal = z.infer<typeof SpoonacularItemResponseSchema>

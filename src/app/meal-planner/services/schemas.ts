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
        strIngredient1: z.string().optional().nullable(),
        strIngredient2: z.string().optional().nullable(),
        strIngredient3: z.string().optional().nullable(),
        strIngredient4: z.string().optional().nullable(),
        strIngredient5: z.string().optional().nullable(),
        strIngredient6: z.string().optional().nullable(),
        strIngredient7: z.string().optional().nullable(),
        strIngredient8: z.string().optional().nullable(),
        strIngredient9: z.string().optional().nullable(),
        strIngredient10: z.string().optional().nullable(),
        strIngredient11: z.string().optional().nullable(),
        strIngredient12: z.string().optional().nullable(),
        strIngredient13: z.string().optional().nullable(),
        strIngredient14: z.string().optional().nullable(),
        strIngredient15: z.string().optional().nullable(),
        strIngredient16: z.string().optional().nullable(),
        strIngredient17: z.string().optional().nullable(),
        strIngredient18: z.string().optional().nullable(),
        strIngredient19: z.string().optional().nullable(),
        strIngredient20: z.string().optional().nullable(),
        strMeasure1: z.string().optional().nullable(),
        strMeasure2: z.string().optional().nullable(),
        strMeasure3: z.string().optional().nullable(),
        strMeasure4: z.string().optional().nullable(),
        strMeasure5: z.string().optional().nullable(),
        strMeasure6: z.string().optional().nullable(),
        strMeasure7: z.string().optional().nullable(),
        strMeasure8: z.string().optional().nullable(),
        strMeasure9: z.string().optional().nullable(),
        strMeasure10: z.string().optional().nullable(),
        strMeasure11: z.string().optional().nullable(),
        strMeasure12: z.string().optional().nullable(),
        strMeasure13: z.string().optional().nullable(),
        strMeasure14: z.string().optional().nullable(),
        strMeasure15: z.string().optional().nullable(),
        strMeasure16: z.string().optional().nullable(),
        strMeasure17: z.string().optional().nullable(),
        strMeasure18: z.string().optional().nullable(),
        strMeasure19: z.string().optional().nullable(),
        strMeasure20: z.string().optional().nullable(),
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

// Base Spoonacular recipe schema
export const SpoonacularRecipeSchema = z.object({
  id: z.number(),
  title: z.string(),
  summary: z.string(),
  image: z.string(),
  servings: z.number(),
  readyInMinutes: z.number(),
  cookingMinutes: z.number().nullable(),
  preparationMinutes: z.number().nullable(),
  sourceName: z.string(),
  sourceUrl: z.string(),
  spoonacularSourceUrl: z.string().optional(),
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
  instructions: z.string().nullable(),
  vegan: z.boolean(),
  vegetarian: z.boolean(),
  whole30: z.boolean().optional(),
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

export const SpoonacularRecipeBulkResponseSchema = z.array(
  SpoonacularRecipeSchema
)

export const SpoonacularRecipeResponseSchema = SpoonacularRecipeSchema

export type SpoonacularRecipeBulkResponse = z.infer<
  typeof SpoonacularRecipeBulkResponseSchema
>

export type SpoonacularRecipe = NonNullable<SpoonacularRecipeBulkResponse>[0]

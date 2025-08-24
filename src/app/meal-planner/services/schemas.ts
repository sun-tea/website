import { z } from 'zod'

// Our internal Recipe schema (single source of truth)
export const RecipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  cookTime: z.number(),
  difficulty: z.enum(['beginner', 'easy', 'medium', 'hard']),
  category: z.enum(['breakfast', 'meal', 'dessert', 'snack', 'drink']),
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
        strMealThumb: z.string(),
        strTags: z.string().nullable().optional(),
        // Ingredients (MealDB has up to 20 ingredient/measure pairs)
        strIngredient1: z.string().nullable().optional(),
        strIngredient2: z.string().nullable().optional(),
        strIngredient3: z.string().nullable().optional(),
        strIngredient4: z.string().nullable().optional(),
        strIngredient5: z.string().nullable().optional(),
        strIngredient6: z.string().nullable().optional(),
        strIngredient7: z.string().nullable().optional(),
        strIngredient8: z.string().nullable().optional(),
        strIngredient9: z.string().nullable().optional(),
        strIngredient10: z.string().nullable().optional(),
        strIngredient11: z.string().nullable().optional(),
        strIngredient12: z.string().nullable().optional(),
        strIngredient13: z.string().nullable().optional(),
        strIngredient14: z.string().nullable().optional(),
        strIngredient15: z.string().nullable().optional(),
        strIngredient16: z.string().nullable().optional(),
        strIngredient17: z.string().nullable().optional(),
        strIngredient18: z.string().nullable().optional(),
        strIngredient19: z.string().nullable().optional(),
        strIngredient20: z.string().nullable().optional(),
        strMeasure1: z.string().nullable().optional(),
        strMeasure2: z.string().nullable().optional(),
        strMeasure3: z.string().nullable().optional(),
        strMeasure4: z.string().nullable().optional(),
        strMeasure5: z.string().nullable().optional(),
        strMeasure6: z.string().nullable().optional(),
        strMeasure7: z.string().nullable().optional(),
        strMeasure8: z.string().nullable().optional(),
        strMeasure9: z.string().nullable().optional(),
        strMeasure10: z.string().nullable().optional(),
        strMeasure11: z.string().nullable().optional(),
        strMeasure12: z.string().nullable().optional(),
        strMeasure13: z.string().nullable().optional(),
        strMeasure14: z.string().nullable().optional(),
        strMeasure15: z.string().nullable().optional(),
        strMeasure16: z.string().nullable().optional(),
        strMeasure17: z.string().nullable().optional(),
        strMeasure18: z.string().nullable().optional(),
        strMeasure19: z.string().nullable().optional(),
        strMeasure20: z.string().nullable().optional(),
      })
    )
    .nullable(),
})

export type MealDBListResponse = z.infer<typeof MealDBListResponseSchema>
export type MealDBMeal = NonNullable<MealDBListResponse['meals']>[0]

export const SpoonacularListResponseSchema = z.object({
  offset: z.number().optional(),
  number: z.number().optional(),
  results: z
    .array(
      z.object({
        id: z.number(),
        title: z.string(),
        image: z.string(),
        imageType: z.string(),
      })
    )
    .optional(),
  totalResults: z.number().optional(),
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

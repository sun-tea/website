import { z } from 'zod'

// Auth schemas
export const LoginCredentialsSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export const AuthResponseSchema = z.object({
  success: z.boolean(),
  user: z
    .object({
      // Add user properties based on actual API response
      id: z.string().optional(),
      name: z.string().optional(),
    })
    .optional(),
  error: z.string().optional(),
})

// Bouldering data schemas
export const BoulderingArticleSchema = z.object({
  _id: z.string(),
  calendarId: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  difficulty: z.string().optional(),
  status: z.string().optional(),
  section: z.string().optional(),
  check: z.boolean().optional(), // Indicates if the boulder was completed
  date: z.string().optional(), // Completion date
  category: z.string().optional(),
  photos: z
    .array(
      z.object({
        name: z.string().optional(),
        photo: z.string().optional(),
      })
    )
    .optional(),
  start: z.string().optional(),
})

export const BoulderingDataResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(BoulderingArticleSchema).optional(),
  error: z.string().optional(),
})

export const BoulderingStatsSchema = z.object({
  totalProblems: z.number(),
  completedProblems: z.number(),
})

// Type exports
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>
export type AuthResponse = z.infer<typeof AuthResponseSchema>
export type BoulderingArticle = z.infer<typeof BoulderingArticleSchema>
export type BoulderingDataResponse = z.infer<
  typeof BoulderingDataResponseSchema
>
export type BoulderingStats = z.infer<typeof BoulderingStatsSchema>

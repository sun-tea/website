import { Recipe, RecipeAdapter } from '../types'

export class MealDBAdapter implements RecipeAdapter {
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1'

  transform(mealDbData: any): Recipe {
    // MealDB specific transformation
    return {
      id: `mealdb-${mealDbData.idMeal}`,
      name: mealDbData.strMeal,
      cookTime: this.estimateCookTime(mealDbData.strInstructions), // Custom logic
      difficulty: this.calculateDifficulty(mealDbData), // Custom logic
      category: this.mapCategory(mealDbData.strCategory),
      ingredients: this.extractIngredients(mealDbData),
      instructions: this.parseInstructions(mealDbData.strInstructions),
      calories: undefined, // MealDB doesn't provide this
      protein: undefined,
      image: mealDbData.strMealThumb,
      source: 'mealdb',
      tags: this.extractTags(mealDbData),
      description: `${mealDbData.strCategory} recipe from ${mealDbData.strArea || 'International'} cuisine`,
    }
  }

  async fetchByCategory(category: string): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/filter.php?c=${category}`)
    const data = await response.json()
    return data.meals || []
  }

  async search(query: string): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/search.php?s=${query}`)
    const data = await response.json()
    return data.meals || []
  }

  private extractIngredients(meal: any): string[] {
    const ingredients: string[] = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]
      const measure = meal[`strMeasure${i}`]
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure?.trim() || ''} ${ingredient.trim()}`.trim())
      }
    }
    return ingredients
  }

  private parseInstructions(instructions: string): string[] {
    return instructions
      .split(/\r?\n/)
      .filter(step => step.trim())
      .map(step => step.trim())
  }

  private mapCategory(category: string): Recipe['category'] {
    const mapping: Record<string, Recipe['category']> = {
      Breakfast: 'breakfast',
      Dessert: 'snack',
      Starter: 'snack',
      // Add more mappings
    }
    return mapping[category] || 'dinner'
  }

  private calculateDifficulty(meal: any): Recipe['difficulty'] {
    const instructionLength = meal.strInstructions?.length || 0
    const ingredientCount = this.extractIngredients(meal).length

    if (instructionLength < 200 && ingredientCount < 8) return 'beginner'
    if (instructionLength < 400 && ingredientCount < 12) return 'easy'
    return 'medium'
  }

  private estimateCookTime(instructions: string): number {
    // Simple heuristic based on instruction length and keywords
    const timeKeywords = instructions.match(/(\d+)\s*(minute|min|hour|hr)/gi)
    if (timeKeywords) {
      // Extract and sum times mentioned
      const times = timeKeywords.map(match => {
        const num = parseInt(match.match(/\d+/)?.[0] || '0')
        const unit = match.toLowerCase()
        return unit.includes('hour') || unit.includes('hr') ? num * 60 : num
      })
      return Math.max(...times)
    }

    // Fallback: estimate based on instruction length
    const length = instructions.length
    if (length < 300) return 15
    if (length < 600) return 30
    return 45
  }

  private extractTags(meal: any): string[] {
    const tags = []
    if (meal.strCategory) tags.push(meal.strCategory.toLowerCase())
    if (meal.strArea) tags.push(meal.strArea.toLowerCase())
    if (meal.strTags) {
      tags.push(
        ...meal.strTags
          .split(',')
          .map((tag: string) => tag.trim().toLowerCase())
      )
    }
    return tags
  }
}

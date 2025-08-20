'use client'

import { Recipe } from '../services/schemas'

export default function RecipeItem({
  recipe,
  onRecipeSelect,
  selectedRecipe,
  index,
  getDifficultyColor,
  getCategoryEmoji,
}: {
  recipe: Recipe
  onRecipeSelect: (recipe: Recipe) => void
  selectedRecipe: Recipe | null
  index: number
  getDifficultyColor: (difficulty: string) => string
  getCategoryEmoji: (category: string) => string
}) {
  return (
    <button
      onClick={() => onRecipeSelect(recipe)}
      className={`w-full rounded-sm p-3 text-left hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors cursor-pointer ${
        selectedRecipe?.id === recipe.id
          ? 'bg-blue-50 dark:bg-blue-900 dark:hover:bg-blue-900 inset-ring-2 inset-ring-blue-400'
          : ''
      } ${index === 0 ? 'rounded-t-lg' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span>{recipe.category && getCategoryEmoji(recipe.category)}</span>
            <h4 className="font-medium text-gray-900 dark:text-gray-300 text-sm">
              {recipe.name}
            </h4>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span>⏱️ {recipe.cookTime}m</span>
            <span
              className={`px-2 py-0.5 rounded-full ${recipe.difficulty && getDifficultyColor(recipe.difficulty)}`}
            >
              {recipe.difficulty}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
            {recipe.description}
          </p>
        </div>
      </div>
    </button>
  )
}

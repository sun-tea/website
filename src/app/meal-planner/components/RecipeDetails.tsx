'use client'

import { Recipe } from '../services/schemas'

interface RecipeDetailsProps {
  selectedRecipe: Recipe | null
  onClose: () => void
  getDifficultyColor: (difficulty: string) => string
  getCategoryEmoji: (category: string) => string
}

export default function RecipeDetails({
  selectedRecipe,
  onClose,
  getDifficultyColor,
  getCategoryEmoji,
}: RecipeDetailsProps) {
  if (!selectedRecipe) {
    return (
      <div className="bg-white dark:bg-gray-800 lg:col-span-2 rounded-lg shadow-sm h-full min-h-[400px] p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3">🍳</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Select a recipe
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm text-sm">
            Choose a recipe from the list on the left to see detailed
            ingredients and cooking instructions.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 lg:col-span-2 rounded-lg shadow-sm overflow-y-auto">
      {/* Recipe Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {selectedRecipe.category &&
                getCategoryEmoji(selectedRecipe.category)}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedRecipe.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-xl cursor-pointer"
          >
            ×
          </button>
        </div>

        <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
          {selectedRecipe.description}
        </p>

        {/* Recipe Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {selectedRecipe.cookTime}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Minutes
            </div>
          </div>
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {selectedRecipe.protein ? `${selectedRecipe.protein}g` : 'N/A'}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Protein
            </div>
          </div>
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${selectedRecipe.difficulty && getDifficultyColor(selectedRecipe.difficulty)}`}
            >
              {selectedRecipe.difficulty}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Difficulty
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {selectedRecipe.tags?.map((tag: string) => (
            <span
              key={tag}
              className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Recipe Content */}
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Instructions */}
          <div className="col-span-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              👨‍🍳 Instructions
            </h3>
            <div className="space-y-3">
              {selectedRecipe.instructions?.map(
                (instruction: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1 min-w-6">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm pt-1">
                      {instruction}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          {/* Ingredients */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              🛒 Ingredients
            </h3>
            <div className="space-y-2">
              {selectedRecipe.ingredients?.map(
                (ingredient: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="w-5 h-5 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 min-w-6">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {ingredient}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

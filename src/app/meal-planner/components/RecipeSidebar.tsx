'use client'

import { useRef, useEffect } from 'react'

import { Recipe } from '../services/schemas'
import RecipeItem from './RecipeItem'

interface RecipeSidebarProps {
  filteredRecipes: Recipe[]
  selectedCategory: string
  selectedDifficulty: string
  selectedRecipe: Recipe | null
  focusedRecipeIndex: number
  onCategoryChange: (category: string) => void
  onDifficultyChange: (difficulty: string) => void
  onRecipeSelect: (recipe: Recipe) => void
  getDifficultyColor: (difficulty: string) => string
  getCategoryEmoji: (category: string) => string
}

export default function RecipeSidebar({
  filteredRecipes,
  selectedCategory,
  selectedDifficulty,
  selectedRecipe,
  focusedRecipeIndex,
  onCategoryChange,
  onDifficultyChange,
  onRecipeSelect,
  getDifficultyColor,
  getCategoryEmoji,
}: RecipeSidebarProps) {
  const recipeListRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to focused recipe when it changes
  useEffect(() => {
    if (focusedRecipeIndex >= 0 && recipeListRef.current) {
      const recipeElements = recipeListRef.current.querySelectorAll('button')
      const focusedElement = recipeElements[focusedRecipeIndex]

      if (focusedElement) {
        focusedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        })
      }
    }
  }, [focusedRecipeIndex])

  return (
    <div className="lg:col-span-1 flex flex-col space-y-4 min-h-0">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 flex-shrink-0">
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm text-center">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {filteredRecipes.length}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-xs">
            Recipes
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm text-center">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            5-35
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-xs">
            Min Max
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex-shrink-0">
        <div className="space-y-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => onCategoryChange(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Meals</option>
              <option value="breakfast">🌅 Breakfast</option>
              <option value="lunch">🥗 Lunch</option>
              <option value="dinner">🍽️ Dinner</option>
              <option value="snack">🍿 Snacks</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={e => onDifficultyChange(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recipe List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm flex-1 min-h-0 overflow-hidden">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
              Recipes ({filteredRecipes.length})
            </h3>
            <button
              type="button"
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              title="Keyboard Navigation: ↑↓ arrows to navigate"
            >
              ⌨️
            </button>
          </div>
        </div>
        <div ref={recipeListRef} className="divide-y overflow-y-auto h-full">
          {filteredRecipes.map((recipe, index) => (
            <RecipeItem
              key={recipe.id}
              recipe={recipe}
              onRecipeSelect={onRecipeSelect}
              selectedRecipe={selectedRecipe}
              index={index}
              getDifficultyColor={getDifficultyColor}
              getCategoryEmoji={getCategoryEmoji}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import RecipeSidebar from './components/RecipeSidebar'
import RecipeDetails from './components/RecipeDetails'
import { getDifficultyColor, getCategoryEmoji } from './utils/recipeUtils'
import { useSelectedRecipe } from './hooks/useSelectedRecipe'
import ThemeToggle from '../components/ThemeToggle'
import { useRecipesByCategory } from './hooks/useRecipes'
import { Recipe } from './services/schemas'

export default function MealPlanner() {
  const { data = [], isLoading } = useRecipesByCategory('Vegetarian')

  // const { data: searchResults } = useRecipeSearch(searchQuery, ['mealdb']);

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const filteredRecipes = data.filter(recipe => {
    const categoryMatch =
      selectedCategory === 'all' || recipe.category === selectedCategory
    const difficultyMatch =
      selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  const {
    focusedRecipeIndex,
    handleKeyDown,
    handleRecipeSelect,
    validateSelectedRecipe,
  } = useSelectedRecipe(data, selectedRecipe, setSelectedRecipe)

  // Reset focus and validate selected recipe when filters change
  useEffect(() => {
    validateSelectedRecipe()
  }, [selectedCategory, selectedDifficulty, validateSelectedRecipe])

  return (
    <>
      <ThemeToggle />
      <div
        className="h-screen bg-indigo-200 dark:bg-gray-900 overflow-hidden outline-none cursor-default transition-colors duration-200"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="h-full max-w-7xl mx-auto px-4 py-6 flex flex-col">
          {/* Header */}
          <div className="text-center mb-6 flex-shrink-0">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
            >
              ← Back to Portfolio
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Qu&apos;est ce qu&apos;on mange&#8239;?
            </h1>
          </div>

          {/* Main Layout: Sidebar + Center Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
            <RecipeSidebar
              filteredRecipes={filteredRecipes}
              selectedCategory={selectedCategory}
              selectedDifficulty={selectedDifficulty}
              selectedRecipe={selectedRecipe}
              focusedRecipeIndex={focusedRecipeIndex}
              onCategoryChange={setSelectedCategory}
              onDifficultyChange={setSelectedDifficulty}
              onRecipeSelect={handleRecipeSelect}
              getDifficultyColor={getDifficultyColor}
              getCategoryEmoji={getCategoryEmoji}
            />

            <RecipeDetails
              selectedRecipe={selectedRecipe}
              onClose={() => setSelectedRecipe(null)}
              getDifficultyColor={getDifficultyColor}
              getCategoryEmoji={getCategoryEmoji}
            />
          </div>

          <div className="mt-4 text-center text-gray-500 dark:text-gray-400 text-xs flex-shrink-0">
            <p>Next.js 14 • TypeScript • Tailwind CSS</p>
          </div>
        </div>
      </div>
    </>
  )
}

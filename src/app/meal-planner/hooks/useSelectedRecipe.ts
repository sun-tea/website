import { useState } from 'react'
import { Recipe } from '../services/schemas'

export function useSelectedRecipe(
  filteredRecipes: Recipe[],
  selectedRecipe: Recipe | null,
  setSelectedRecipe: (recipe: Recipe | null) => void
) {
  const length = filteredRecipes?.length || 0
  const [focusedRecipeIndex, setFocusedRecipeIndex] = useState<number>(-1)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredRecipes?.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!filteredRecipes) return
        if (!selectedRecipe) {
          setSelectedRecipe(filteredRecipes[0])
          setFocusedRecipeIndex(0)
        } else {
          const nextIndex = filteredRecipes.findIndex(
            r => r.id === selectedRecipe.id
          )
          if (nextIndex === length - 1) {
            setSelectedRecipe(filteredRecipes[0])
            setFocusedRecipeIndex(0)
          } else {
            setSelectedRecipe(filteredRecipes[nextIndex + 1])
            setFocusedRecipeIndex(nextIndex + 1)
          }
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!filteredRecipes) return
        if (!selectedRecipe) {
          setSelectedRecipe(filteredRecipes[0])
          setFocusedRecipeIndex(0)
        } else {
          const nextIndex = filteredRecipes.findIndex(
            r => r.id === selectedRecipe?.id
          )
          if (nextIndex === 0) {
            setSelectedRecipe(filteredRecipes[length - 1])
            setFocusedRecipeIndex(length - 1)
          } else {
            setSelectedRecipe(filteredRecipes[nextIndex - 1])
            setFocusedRecipeIndex(nextIndex - 1)
          }
        }
        break
      case 'Escape':
        e.preventDefault()
        setSelectedRecipe(null)
        break
    }
  }

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    const index = filteredRecipes?.findIndex(r => r.id === recipe.id) || 0
    setFocusedRecipeIndex(index)
  }

  const validateSelectedRecipe = () => {
    if (
      selectedRecipe &&
      !filteredRecipes?.find(r => r.id === selectedRecipe.id)
    ) {
      setSelectedRecipe(filteredRecipes?.[0] ?? null)
    }
  }

  return {
    focusedRecipeIndex,
    handleKeyDown,
    handleRecipeSelect,
    validateSelectedRecipe,
  }
}

import { useState } from 'react'
import { Recipe } from '../_recipes'

export function useKeyboardNavigation(
  filteredRecipes: Record<string, any>[],
  selectedRecipe: Record<string, any> | null,
  setSelectedRecipe: (recipe: Record<string, any> | null) => void
) {
  const length = filteredRecipes.length
  const [focusedRecipeIndex, setFocusedRecipeIndex] = useState<number>(-1)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredRecipes.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!selectedRecipe) {
          setSelectedRecipe(filteredRecipes[0])
          setFocusedRecipeIndex(0)
        } else {
          const nextIndex = filteredRecipes.findIndex(
            r => r.id === selectedRecipe?.id
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
      case 'Home':
        e.preventDefault()
        setSelectedRecipe(filteredRecipes[0])
        setFocusedRecipeIndex(0)
        break
      case 'End':
        e.preventDefault()
        const lastIndex = filteredRecipes.length - 1
        setSelectedRecipe(filteredRecipes[lastIndex])
        setFocusedRecipeIndex(lastIndex)
        break
    }
  }

  const handleRecipeSelect = (recipe: Record<string, any>) => {
    setSelectedRecipe(recipe)
    const index = filteredRecipes.findIndex(r => r.id === recipe.id)
    setFocusedRecipeIndex(index)
  }

  const validateSelectedRecipe = () => {
    if (
      selectedRecipe &&
      !filteredRecipes.find(r => r.id === selectedRecipe.id)
    ) {
      setSelectedRecipe(filteredRecipes[0] ?? null)
    }
  }

  return {
    focusedRecipeIndex,
    handleKeyDown,
    handleRecipeSelect,
    validateSelectedRecipe,
  }
}

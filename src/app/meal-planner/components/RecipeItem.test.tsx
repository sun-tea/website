import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import RecipeItem from './RecipeItem'
import type { Recipe } from '../services/schemas'

describe('RecipeItem', () => {
  const mockRecipe: Recipe = {
    id: 'recipe-1',
    name: 'Spaghetti Carbonara',
    cookTime: 30,
    difficulty: 'easy',
    category: 'meal',
    ingredients: ['pasta', 'eggs', 'bacon'],
    instructions: ['Cook pasta', 'Mix eggs', 'Combine'],
    source: 'mealdb',
    tags: ['italian', 'pasta'],
    description: 'A classic Italian pasta dish',
    image: 'https://example.com/carbonara.jpg',
  }

  const mockGetDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const mockGetCategoryEmoji = (category: string) => {
    switch (category) {
      case 'meal':
        return '🍽️'
      default:
        return '🍴'
    }
  }

  const defaultProps = {
    recipe: mockRecipe,
    onRecipeSelect: vi.fn(),
    selectedRecipe: null,
    index: 0,
    getDifficultyColor: mockGetDifficultyColor,
    getCategoryEmoji: mockGetCategoryEmoji,
  }

  it('renders recipe name', () => {
    render(<RecipeItem {...defaultProps} />)

    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument()
  })

  it('renders cook time', () => {
    render(<RecipeItem {...defaultProps} />)

    expect(screen.getByText('⏱️ 30m')).toBeInTheDocument()
  })

  it('renders difficulty badge', () => {
    render(<RecipeItem {...defaultProps} />)

    expect(screen.getByText('easy')).toBeInTheDocument()
  })

  it('renders recipe description', () => {
    render(<RecipeItem {...defaultProps} />)

    expect(
      screen.getByText('A classic Italian pasta dish'),
    ).toBeInTheDocument()
  })

  it('renders category emoji', () => {
    render(<RecipeItem {...defaultProps} />)

    expect(screen.getByText('🍽️')).toBeInTheDocument()
  })

  it('calls onRecipeSelect when clicked', async () => {
    const user = userEvent.setup()
    const onRecipeSelect = vi.fn()

    render(<RecipeItem {...defaultProps} onRecipeSelect={onRecipeSelect} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(onRecipeSelect).toHaveBeenCalledWith(mockRecipe)
    expect(onRecipeSelect).toHaveBeenCalledTimes(1)
  })

  it('applies selected styles when recipe is selected', () => {
    render(<RecipeItem {...defaultProps} selectedRecipe={mockRecipe} />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-blue-50')
  })

  it('does not apply selected styles when recipe is not selected', () => {
    render(<RecipeItem {...defaultProps} selectedRecipe={null} />)

    const button = screen.getByRole('button')
    expect(button).not.toHaveClass('bg-blue-50')
  })

  it('applies rounded-t-lg class when index is 0', () => {
    render(<RecipeItem {...defaultProps} index={0} />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('rounded-t-lg')
  })

  it('does not apply rounded-t-lg class when index is not 0', () => {
    render(<RecipeItem {...defaultProps} index={1} />)

    const button = screen.getByRole('button')
    expect(button).not.toHaveClass('rounded-t-lg')
  })

  it('applies correct difficulty color', () => {
    render(<RecipeItem {...defaultProps} />)

    const difficultyBadge = screen.getByText('easy')
    expect(difficultyBadge).toHaveClass('bg-green-100')
    expect(difficultyBadge).toHaveClass('text-green-800')
  })
})

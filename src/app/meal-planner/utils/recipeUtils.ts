export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800'
    case 'easy':
      return 'bg-yellow-100 text-yellow-800'
    case 'medium':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getCategoryEmoji = (category: string) => {
  switch (category) {
    case 'breakfast':
      return '🌅'
    case 'lunch':
      return '🥗'
    case 'dinner':
      return '🍽️'
    case 'snack':
      return '🍿'
    default:
      return '🍴'
  }
}

export interface Recipe {
  id: string
  name: string
  cookTime?: number
  difficulty?: 'beginner' | 'easy' | 'medium' | 'hard'
  category?: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  ingredients?: string[]
  instructions?: string[]
  calories?: number
  protein?: number
  tags?: string[]
  description?: string
}

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'One-Pot Creamy Pasta',
    cookTime: 20,
    difficulty: 'beginner',
    category: 'dinner',
    ingredients: [
      '8oz pasta (penne or fusilli)',
      '1 cup heavy cream',
      '1/2 cup parmesan cheese',
      '2 cloves garlic, minced',
      '1 cup frozen peas',
      'Salt and pepper',
    ],
    instructions: [
      'Boil pasta according to package directions',
      'In the same pot, sauté garlic for 1 minute',
      'Add cream, bring to simmer',
      'Add cooked pasta, peas, and parmesan',
      'Toss until creamy, season with salt and pepper',
    ],
    calories: 520,
    protein: 18,
    tags: ['one-pot', 'vegetarian', 'comfort-food'],
    description:
      'Creamy, satisfying pasta that uses just one pot. Perfect for busy weeknights.',
  },
  {
    id: '2',
    name: 'Sheet Pan Chicken & Veggies',
    cookTime: 35,
    difficulty: 'easy',
    category: 'dinner',
    ingredients: [
      '4 chicken thighs',
      '2 cups mixed vegetables (broccoli, carrots, potatoes)',
      '3 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp paprika',
      'Salt and pepper',
    ],
    instructions: [
      'Preheat oven to 425°F',
      'Toss chicken and veggies with oil and seasonings',
      'Arrange on sheet pan',
      'Bake for 25-30 minutes until chicken is cooked through',
      'Let rest 5 minutes before serving',
    ],
    calories: 450,
    protein: 32,
    tags: ['sheet-pan', 'high-protein', 'meal-prep'],
    description: 'Complete meal on one pan. Minimal cleanup, maximum flavor.',
  },
  {
    id: '3',
    name: 'Quick Breakfast Bowl',
    cookTime: 5,
    difficulty: 'beginner',
    category: 'breakfast',
    ingredients: [
      '1/2 cup instant oats',
      '1/2 cup milk of choice',
      '1 banana, sliced',
      '2 tbsp peanut butter',
      '1 tbsp honey',
      '1/4 cup berries',
    ],
    instructions: [
      'Mix oats with milk in bowl',
      'Microwave for 1-2 minutes',
      'Top with banana, peanut butter, honey',
      'Add berries and enjoy',
    ],
    calories: 380,
    protein: 12,
    tags: ['quick', 'healthy', 'no-cook'],
    description:
      'Nutritious breakfast ready in minutes. Customize with your favorite toppings.',
  },
  {
    id: '4',
    name: 'Simple Stir-Fry',
    cookTime: 15,
    difficulty: 'easy',
    category: 'dinner',
    ingredients: [
      '1 lb protein (chicken, tofu, or shrimp)',
      '2 cups frozen stir-fry vegetables',
      '3 tbsp soy sauce',
      '2 tbsp oil',
      '1 tsp ginger paste',
      '2 cloves garlic, minced',
      'Cooked rice for serving',
    ],
    instructions: [
      'Heat oil in large pan or wok',
      'Cook protein until done, remove and set aside',
      'Add vegetables, cook 3-4 minutes',
      'Add garlic and ginger, cook 1 minute',
      'Return protein, add soy sauce',
      'Serve over rice',
    ],
    calories: 420,
    protein: 28,
    tags: ['quick', 'high-protein', 'customizable'],
    description:
      'Fast, flexible dinner. Use whatever protein and veggies you have on hand.',
  },
  {
    id: '5',
    name: 'Avocado Toast Plus',
    cookTime: 10,
    difficulty: 'beginner',
    category: 'breakfast',
    ingredients: [
      '2 slices whole grain bread',
      '1 ripe avocado',
      '2 eggs',
      '1 tbsp olive oil',
      'Salt, pepper, red pepper flakes',
      'Optional: cherry tomatoes, feta cheese',
    ],
    instructions: [
      'Toast bread to your liking',
      'Mash avocado with salt and pepper',
      'Fry or poach eggs in olive oil',
      'Spread avocado on toast',
      'Top with eggs and seasonings',
      'Add tomatoes or feta if desired',
    ],
    calories: 420,
    protein: 16,
    tags: ['healthy', 'protein', 'customizable'],
    description:
      'Elevated avocado toast with protein to keep you full all morning.',
  },
  {
    id: '6',
    name: 'Microwave Mac & Cheese',
    cookTime: 8,
    difficulty: 'beginner',
    category: 'lunch',
    ingredients: [
      '1 cup elbow macaroni',
      '1/2 cup milk',
      '1/2 cup shredded cheese',
      '1 tbsp butter',
      'Salt and pepper',
      'Optional: frozen peas, ham',
    ],
    instructions: [
      'Put pasta in microwave-safe bowl with water to cover',
      'Microwave 2-3 minutes longer than package directions',
      'Drain, add milk and butter',
      'Microwave 1 more minute',
      'Stir in cheese until melted',
      'Add peas or ham if using',
    ],
    calories: 380,
    protein: 15,
    tags: ['quick', 'comfort-food', 'microwave'],
    description:
      'Creamy mac and cheese made entirely in the microwave. No stovetop needed!',
  },
]

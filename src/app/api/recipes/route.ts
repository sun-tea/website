import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const query = searchParams.get('query')
  const source = searchParams.get('source') || 'spoonacular'

  if (source === 'spoonacular') {
    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    try {
      const url = 'https://api.spoonacular.com/recipes/complexSearch'
      const params = new URLSearchParams({
        apiKey,
        addRecipeInformation: 'true',
        number: '12',
      })

      if (category && category !== 'all') {
        params.append('type', category)
      }
      if (query) {
        params.append('query', query)
      }

      const response = await fetch(`${url}?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'API request failed')
      }

      return NextResponse.json(data.results || [])
    } catch (error) {
      console.error('Spoonacular API error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch recipes' },
        { status: 500 }
      )
    }
  }

  // Handle other sources (mealdb, etc.)
  return NextResponse.json({ error: 'Source not supported' }, { status: 400 })
}

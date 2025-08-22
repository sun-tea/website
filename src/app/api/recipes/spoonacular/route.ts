import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const source = searchParams.get('source') || 'spoonacular'

  if (source === 'spoonacular') {
    const baseUrl = `https://api.spoonacular.com/recipes/`
    const apiKey = process.env.SPOONACULAR_API_KEY
    const category = searchParams.get('category')
    const query = searchParams.get('query')
    const path = searchParams.get('path')
    const ids = searchParams.get('ids')

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    try {
      const url = `${baseUrl}${path}`
      const params = new URLSearchParams({
        apiKey,
        addRecipeInformation: 'true',
        number: '12',
      })

      if (category && category !== 'all') {
        params.append('diet', category)
      }
      if (query) {
        params.append('query', query)
      }
      if (ids) {
        params.append('ids', ids)
      }

      const response = await fetch(`${url}?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'API request failed')
      }

      return NextResponse.json(data)
    } catch (error) {
      console.error('Spoonacular API error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch recipes' },
        { status: 500 }
      )
    }
  }

  // Handle other sources
  return NextResponse.json({ error: 'Source not supported' }, { status: 400 })
}

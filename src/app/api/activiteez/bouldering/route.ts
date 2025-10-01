import { NextRequest, NextResponse } from 'next/server'

import { BoulderingArticle } from '@/app/me/services/schemas'

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('activiteez-session')

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Not authenticated. Please log in first.' },
        { status: 401 }
      )
    }

    // The cookie value is already URL-encoded, use it as-is
    const sidValue = sessionCookie.value

    const response = await fetch(
      'https://activiteez.com/users/85874833292266/listArticles?status=live&app=true&clientReports=true',
      {
        method: 'GET',
        headers: {
          Cookie: `sid=${sidValue}`,
        },
      }
    )

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Session expired. Please log in again.' },
          { status: 401 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to fetch bouldering data' },
        { status: response.status }
      )
    }

    const responseText = await response.text()

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error('Failed to parse response as JSON:', e)
      return NextResponse.json(
        { error: 'Invalid response format from Activiteez API' },
        { status: 500 }
      )
    }

    // Check if the response indicates auth is needed
    if (data && typeof data === 'object' && 'code' in data) {
      if (data.code === 401 || data.text === 'Auth needed') {
        return NextResponse.json(
          {
            success: false,
            code: 401,
            text: 'Auth needed',
            error: 'Session expired. Please log in again.',
          },
          { status: 401 }
        )
      }
    }

    let articles = data.list || data.data || (Array.isArray(data) ? data : [])

    articles = articles.filter((article: BoulderingArticle) => {
      const category = article.category || ''
      return ['Rouge', 'Violet'].includes(category)
    })

    return NextResponse.json({
      success: true,
      data: articles,
    })
  } catch (error) {
    console.error('Activiteez bouldering data error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' })

  response.cookies.delete('activiteez-session')

  return response
}

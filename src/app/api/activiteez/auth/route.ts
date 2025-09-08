import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const username = process.env.ACTIVITEEZ_USERNAME
    const password = process.env.ACTIVITEEZ_PASSWORD

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Internal credentials not configured' },
        { status: 500 }
      )
    }

    const formData = new URLSearchParams()
    formData.append('username', username)
    formData.append('password', password)

    const response = await fetch('https://activiteez.com/connexion', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Auth response error:', errorText.substring(0, 200))
      return NextResponse.json(
        { error: `Authentication failed: ${response.status}` },
        { status: 401 }
      )
    }

    const setCookieHeader = response.headers.get('set-cookie')
    const contentType = response.headers.get('content-type')

    if (!setCookieHeader) {
      return NextResponse.json(
        { error: 'No session cookie received' },
        { status: 500 }
      )
    }

    // Extract session ID from cookie
    const sidMatch = setCookieHeader.match(/sid=([^;]+)/)
    const sessionId = sidMatch ? sidMatch[1] : null

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Invalid session cookie format' },
        { status: 500 }
      )
    }

    // Try to parse as JSON, but handle HTML responses
    let data = {}
    try {
      const responseText = await response.text()

      if (contentType?.includes('application/json')) {
        data = JSON.parse(responseText)
      } else {
        // If it's HTML but we got a session cookie, consider it a success
        data = { message: 'Authentication successful' }
      }
    } catch (parseError) {
      console.error('Failed to parse response:', parseError)
      // If we have a session cookie, continue anyway
      data = { message: 'Authentication successful' }
    }

    const nextResponse = NextResponse.json({
      success: true,
      user: data,
    })

    // Store session cookie in httpOnly cookie
    // Decode the sessionId if it's URL-encoded (e.g., s%3A... to s:...)
    const decodedSessionId = decodeURIComponent(sessionId)

    nextResponse.cookies.set('activiteez-session', decodedSessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 14, // 14 days
      path: '/',
    })

    return nextResponse
  } catch (error) {
    console.error('Activiteez auth error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

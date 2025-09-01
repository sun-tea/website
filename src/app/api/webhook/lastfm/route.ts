const ENDPOINT = new URL('https://ws.audioscrobbler.com/2.0/')

export async function GET() {
  const sessionKey = process.env.LASTFM_MY_SESSION_KEY
  const username = process.env.LASTFM_MY_USERNAME
  const apiKey = process.env.LASTFM_API_KEY

  if (!sessionKey) {
    return Response.json(
      { error: 'No personal session key configured' },
      { status: 500 }
    )
  }

  if (!username) {
    return Response.json({ error: 'No username configured' }, { status: 500 })
  }

  if (!apiKey) {
    return Response.json({ error: 'No API key configured' }, { status: 500 })
  }

  try {
    const recentTracks = await getRecentTracks(username, apiKey)
    const topArtists = await getTopArtists(username, apiKey)
    const userInfo = await getUserInfo(username, apiKey)

    return Response.json({
      recentTracks,
      topArtists,
      userInfo,
      username,
    })
  } catch (error) {
    console.error('Last.fm API error:', error)
    return Response.json(
      { error: 'Failed to fetch music data' },
      { status: 500 }
    )
  }
}

async function getRecentTracks(username: string, apiKey: string) {
  const url = new URL(ENDPOINT)
  url.searchParams.set('method', 'user.getrecenttracks')
  url.searchParams.set('user', username)
  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', '10')

  const response = await fetch(url.toString())
  const data = await response.json()
  return data.recenttracks?.track || []
}

async function getTopArtists(username: string, apiKey: string) {
  const url = new URL(ENDPOINT)
  url.searchParams.set('method', 'user.gettopartists')
  url.searchParams.set('user', username)
  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('format', 'json')
  url.searchParams.set('period', '1month')
  url.searchParams.set('limit', '15')

  const response = await fetch(url.toString())
  const data = await response.json()
  return data.topartists?.artist || []
}

async function getUserInfo(username: string, apiKey: string) {
  const url = new URL(ENDPOINT)
  url.searchParams.set('method', 'user.getinfo')
  url.searchParams.set('user', username)
  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('format', 'json')

  const response = await fetch(url.toString())
  const data = await response.json()
  return data.user
}

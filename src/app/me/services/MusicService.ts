import { LastFMMusicData, LastFMMusicDataSchema } from '../schemas'

export class MusicService {
  private baseUrl = '/api/lastfm'

  async getMusicStats(): Promise<LastFMMusicData> {
    try {
      const response = await fetch(this.baseUrl)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const rawData = await response.json()

      const validatedData = LastFMMusicDataSchema.parse(rawData)

      return validatedData
    } catch (error) {
      console.error('Failed to fetch music stats:', error)

      if (error instanceof Error) {
        throw new Error(`Failed to fetch music stats: ${error.message}`)
      }

      throw new Error('Failed to fetch music stats: Unknown error')
    }
  }
}

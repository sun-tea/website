import { AuthResponse, BoulderingArticle, BoulderingStats } from './schemas'

export class BoulderingService {
  private static readonly BASE_API_URL = '/api/activiteez'

  static async login(): Promise<AuthResponse> {
    const response = await fetch(`${this.BASE_API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Login failed')
    }

    return response.json()
  }

  static async logout(): Promise<void> {
    const response = await fetch(`${this.BASE_API_URL}/bouldering`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Logout failed')
    }
  }

  static async getBoulderingData(): Promise<BoulderingArticle[]> {
    const response = await fetch(`${this.BASE_API_URL}/bouldering`)

    const result = await response.json()

    if (!response.ok || result.code === 401 || !result.success) {
      const errorMessage =
        result.error || result.text || 'Failed to fetch bouldering data'
      if (result.code === 401 || errorMessage.toLowerCase().includes('auth')) {
        throw new Error('Session expired. Please log in again.')
      }
      throw new Error(errorMessage)
    }

    if (!result.data || !Array.isArray(result.data)) {
      throw new Error('Invalid data format received')
    }

    return result.data
  }

  static calculateStats(articles: BoulderingArticle[]): BoulderingStats {
    const totalProblems = articles.length
    const completedProblems = articles.filter(
      article => article.check === true
    ).length

    return {
      totalProblems,
      completedProblems,
    }
  }
}

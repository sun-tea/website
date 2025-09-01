import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { MusicService } from '../services/MusicService'
import { LastFMMusicData } from '../schemas'

const musicService = new MusicService()

export function useMusicStats(): UseQueryResult<LastFMMusicData, Error> {
  return useQuery({
    queryKey: ['music', 'stats'],
    queryFn: () => musicService.getMusicStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

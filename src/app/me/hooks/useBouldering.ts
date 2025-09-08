import { useQuery } from '@tanstack/react-query'

import { BoulderingService } from '../services/BoulderingService'

export const useBoulderingData = (isAuthenticated?: boolean) => {
  return useQuery({
    queryKey: ['bouldering-data'],
    queryFn: () => BoulderingService.getBoulderingData(),
    enabled: !!isAuthenticated, // Only fetch when authenticated
    retry: false, // Don't retry to prevent loops
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useBoulderingStats = () => {
  const { data: articles, ...query } = useBoulderingData()

  return {
    ...query,
    data: articles ? BoulderingService.calculateStats(articles) : undefined,
  }
}

import { useQuery } from '@tanstack/react-query'
import type { GetExperiencesParams } from '../../type'
import api from '../axios'

export const getExperiences = async ({ page, limit }: GetExperiencesParams) => {
  const response = await api.get('/api/v1/experiences', {
    params: { page, limit },
  })
  return response.data
}

export const useGetExperiences = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['experience', page, limit],
    queryFn: () => getExperiences({ page, limit }),
    placeholderData: previousData => previousData,
  })
}

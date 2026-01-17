import { useQuery } from '@tanstack/react-query'
import api from '../axios'

export const getPortfolios = async (page: number, size: number) => {
  const response = await api.get(`/api/v1/portfolios`, {
    params: { page, size },
  })
  return response.data
}

export const useGetAllportfolio = (page: number, size: number) => {
  return useQuery({
    queryKey: ['portfolios', page, size],
    queryFn: () => getPortfolios(page, size),
    placeholderData: previousData => previousData,
  })
}

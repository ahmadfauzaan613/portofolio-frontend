import { useQuery } from '@tanstack/react-query'
import api from '../axios'

export const getDetailPort = async (id: number | string) => {
  const response = await api.get(`/api/v1/portfolios/${id}`, {
    withCredentials: true,
  })
  return response.data.data
}

export const useGetDetailPort = (id?: number | string) => {
  return useQuery({
    queryKey: ['portfolio-detail', id],
    queryFn: () => getDetailPort(id as number | string),
    enabled: !!id,
  })
}

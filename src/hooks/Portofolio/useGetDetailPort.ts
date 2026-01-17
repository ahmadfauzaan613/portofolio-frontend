import { useMutation } from '@tanstack/react-query'
import api from '../axios'

export const getDetailPort = async (id: number) => {
  const response = await api.get(`/api/v1/portfolios/${id}`, {
    withCredentials: true,
  })
  return response.data
}

export const useGetDetailPort = () => {
  return useMutation({
    mutationFn: (id: number) => getDetailPort(id),
  })
}

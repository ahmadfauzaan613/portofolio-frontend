import { useQuery } from '@tanstack/react-query'
import api from '../axios'

export const getCategory = async () => {
  const response = await api.get(`/api/v1/categories`)
  return response.data
}

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: () => getCategory(),
    placeholderData: previousData => previousData,
  })
}

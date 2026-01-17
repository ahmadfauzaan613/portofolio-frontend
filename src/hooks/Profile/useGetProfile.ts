import { useQuery } from '@tanstack/react-query'
import api from '../axios'

export const getProfile = async () => {
  const response = await api.get(`/api/v1/profiles/latest`)
  return response.data.data
}

export const useGetAllProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
    placeholderData: previousData => previousData,
  })
}

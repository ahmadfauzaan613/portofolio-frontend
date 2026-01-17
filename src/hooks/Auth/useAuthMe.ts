import { useQuery } from '@tanstack/react-query'
import api from '../axios'

export const getMe = async () => {
  const response = await api.get('/api/v1/auth/me', {
    withCredentials: true,
  })
  return response.data
}

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: getMe,
    retry: false,
    staleTime: 0,
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../axios'

export const logout = async () => {
  const response = await api.post(
    'auth/logout',
    {},
    {
      withCredentials: true,
    }
  )
  return response.data
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('token')
      queryClient.removeQueries({ queryKey: ['auth'] })
    },
  })
}

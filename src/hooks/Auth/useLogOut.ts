import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../axios'

export const logout = async () => {
  const response = await api.post(
    '/api/v1/auth/logout',
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
      queryClient.removeQueries({ queryKey: ['auth'] })
    },
  })
}

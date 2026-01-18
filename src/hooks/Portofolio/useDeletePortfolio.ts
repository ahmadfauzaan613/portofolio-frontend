import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../axios'

export const deleteDataPort = async (id: number) => {
  const response = await api.delete(`/api/v1/portfolios/${id}`, {
    withCredentials: true,
  })
  return response.data
}

export const useDeletePort = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteDataPort(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] })
    },
  })
}

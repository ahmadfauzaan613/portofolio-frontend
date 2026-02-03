import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../axios'

export const deleteExperience = async (id: number) => {
  const response = await api.delete(`experiences/${id}`, {
    withCredentials: true,
  })
  return response.data
}

export const useDeleteExperience = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] })
    },
  })
}

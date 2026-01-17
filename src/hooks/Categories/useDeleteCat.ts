import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../axios'

export const deleteCategory = async (id: number) => {
  const response = await api.delete(`/api/v1/categories/${id}`, {
    withCredentials: true,
  })
  return response.data
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
  })
}

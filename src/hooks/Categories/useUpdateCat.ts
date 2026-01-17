import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../axios'

export const updateCategory = async (id: number, payload: { name: string }) => {
  const response = await api.put(`/api/v1/categories/${id}`, payload, {
    withCredentials: true,
  })
  return response.data
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => updateCategory(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
  })
}

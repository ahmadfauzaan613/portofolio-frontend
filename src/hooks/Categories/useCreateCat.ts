import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateCategory } from '../../type'
import api from '../axios'

export const createCategory = async (payload: CreateCategory) => {
  const response = await api.post('categories', payload, {
    withCredentials: true,
  })
  return response.data
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
  })
}

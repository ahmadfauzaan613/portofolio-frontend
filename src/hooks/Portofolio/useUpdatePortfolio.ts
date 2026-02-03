import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../axios'

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, formData }: { id: number | string; formData: FormData }) => {
      const { data } = await api.put(`portfolios/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] })
    },
  })
}

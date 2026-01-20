import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../axios'

export const cleanupLogs = async () => {
  const response = await api.delete('/api/v1/logs/cleanup', {
    withCredentials: true,
  })
  return response.data
}

export const useCleanupLogs = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cleanupLogs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] })
    },
  })
}

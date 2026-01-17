import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateExperiencePayload } from '../../type'
import api from '../axios'

export const createExperience = async (payload: CreateExperiencePayload) => {
  const response = await api.post('/api/v1/experiences', payload, {
    withCredentials: true,
  })
  return response.data
}
export const useCreateExperience = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] })
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateExperiencePayload } from '../../type'
import api from '../axios'

export const updateExperience = async (id: number, payload: UpdateExperiencePayload) => {
  const response = await api.put(`experiences/${id}`, payload, {
    withCredentials: true,
  })
  return response.data
}

export const useUpdateExperience = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateExperiencePayload }) =>
      updateExperience(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] })
    },
  })
}

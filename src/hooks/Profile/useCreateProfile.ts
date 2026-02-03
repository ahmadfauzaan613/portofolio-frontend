import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateProfilePayload } from '../../type'
import api from '../axios'

export const createProfile = async (payload: CreateProfilePayload) => {
  const response = await api.post('profiles', payload, { withCredentials: true })
  return response.data
}

export const useCreateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}

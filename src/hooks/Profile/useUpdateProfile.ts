import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { IPayloadUpdate } from '../../type'
import api from '../axios'

export const updateProfile = async ({ id, payload }: { id: number; payload: IPayloadUpdate }) => {
  const response = await api.put(`profiles/${id}`, payload, { withCredentials: true })
  return response.data
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}

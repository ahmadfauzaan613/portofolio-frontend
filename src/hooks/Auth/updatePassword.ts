import { useMutation } from '@tanstack/react-query'
import api from '../axios'

export interface UpdatePasswordPayload {
  oldPassword: string
  newPassword: string
}

export const updatePassword = async (payload: UpdatePasswordPayload) => {
  const response = await api.post('/api/v1/auth/update-password', payload, {
    withCredentials: true,
  })
  return response.data
}

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
  })
}

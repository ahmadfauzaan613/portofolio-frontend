import { useMutation } from '@tanstack/react-query'
import type { LoginPayload } from '../../type'
import api from '../axios'

export const login = async (payload: LoginPayload) => {
  const response = await api.post('/api/v1/auth/login', payload, {
    withCredentials: true,
  })
  return response.data
}

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  })
}

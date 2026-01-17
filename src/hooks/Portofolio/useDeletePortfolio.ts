import { useMutation } from '@tanstack/react-query'
import api from '../axios'

export const deleteDataPort = async (id: number) => {
  const response = await api.delete(`/api/v1/portfolios/${id}`, {
    withCredentials: true,
  })
  return response.data
}

export const useDeletePort = () => {
  return useMutation({
    mutationFn: (id: number) => deleteDataPort(id),
  })
}

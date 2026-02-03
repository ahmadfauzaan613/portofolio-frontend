import { useQuery } from '@tanstack/react-query'
import type { GetLogsParams } from '../../type'
import api from '../axios'

export const getLogs = async ({ page, limit }: GetLogsParams) => {
  const response = await api.get('logs', {
    params: { page, limit },
    withCredentials: true,
  })
  return response.data
}

export const useGetLogs = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['logs', page, limit],
    queryFn: () => getLogs({ page, limit }),
    placeholderData: previousData => previousData,
  })
}

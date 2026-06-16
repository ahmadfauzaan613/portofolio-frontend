import { useMutation } from '@tanstack/react-query'
import api from '../axios'

export const uploadResume = async (file: File) => {
  const formData = new FormData()
  formData.append('resume', file)

  const response = await api.post('profiles/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })
  return response.data.data
}

export const useUploadResume = () => {
  return useMutation({
    mutationFn: uploadResume,
  })
}

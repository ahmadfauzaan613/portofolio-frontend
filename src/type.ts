import type { ReactNode } from 'react'

export interface FormValues {
  oldPassword: string
  newPassword: string
}

export interface IUpdatePassProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: FormValues) => void
  isLoading?: boolean
}

export interface ProfileFormValues {
  role: string
  about: string
  links: {
    type: string
    value: string
  }[]
}

export interface IColumn<T> {
  header: string

  accessor: keyof T | ((item: T) => React.ReactNode)
}

export interface IDataTableProps<T> {
  columns: IColumn<T>[]
  data: T[]
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onSizeChange: (size: number) => void
}

export interface Portfolio {
  id: number
  image_banner: string
  short_desc: string
  description: string
  link: string
  all_image: string[]
  logo: string[]
  category: string
}

export interface PopUpProps {
  title: string
  children: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}

export interface IPayloadUpdate {
  role: string
  about: string
  links: {
    type: string
    value: string
  }[]
}

export interface CreateProfilePayload {
  role: string
  about: string
  links: {
    type: string
    value: string
  }[]
}
export interface CreateCategory {
  name: string
}

export interface CreateExperiencePayload {
  company: string
  role: string
  description: string
  location: string
  start_date: string
  end_date?: string
}

export interface UpdateExperiencePayload {
  company: string
  role: string
  description: string
  location: string
  start_date: string
  end_date?: string
}

export interface GetExperiencesParams {
  page: number
  limit: number
}
export interface GetLogsParams {
  page: number
  limit: number
}

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginForm {
  username: string
  password: string
}

export interface Experience {
  id: number
  role: string
  company: string
  description: string
  location: string
  start_date: string
  end_date: string | null
}

export interface Log {
  id: number
  method: string
  path: string
  status_code: number
  ip_address: string
  user_agent: string
  execution_time: string
  created_at: string
  payload: string
}

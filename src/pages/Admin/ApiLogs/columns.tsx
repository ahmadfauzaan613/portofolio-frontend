import type { IColumn } from '../../../type'

export interface Experience {
  id: number
  role: string
  company: string
  period: string
}

export const expColumns: IColumn<Experience>[] = [
  { header: 'Role', accessor: 'role' },
  { header: 'Company', accessor: 'company' },
  { header: 'Period', accessor: 'period' },
]

import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
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
  {
    header: 'Actions',
    accessor: item => (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-500 cursor-pointer"
          onClick={() => console.log('Edit ID:', item.id)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 cursor-pointer"
          onClick={() => console.log('Delete ID:', item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { formatPeriod } from '../../../lib/FormatTime'
import type { Experience, IColumn } from '../../../type'

export const expColumns = (
  onEdit: (item: Experience) => void,
  onDelete: (id: number) => void
): IColumn<Experience>[] => [
  {
    header: 'Role',
    accessor: 'role',
  },
  {
    header: 'Company',
    accessor: 'company',
  },
  {
    header: 'Description',
    accessor: item => <p className="max-w-xs truncate text-sm ">{item.description}</p>,
  },
  {
    header: 'Location',
    accessor: 'location',
  },
  {
    header: 'Start Date',
    accessor: item => formatPeriod(item.start_date, item.end_date),
  },
  {
    header: 'Actions',
    accessor: item => (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-500 cursor-pointer"
          onClick={() => onEdit(item)}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 cursor-pointer"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

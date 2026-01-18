import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import type { CategoryData, IColumn } from '../../../type'

export const categoryColumn = (
  onEdit: (item: CategoryData) => void,
  onDelete: (id: number) => void
): IColumn<CategoryData>[] => [
  {
    header: 'Category',
    accessor: 'category',
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

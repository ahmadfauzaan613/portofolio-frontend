import { ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import type { IColumn, Portfolio } from '../../../type'

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL

export const PortfolioColumn = (
  onEdit: (item: Portfolio) => void,
  onDelete: (id: number) => void
): IColumn<Portfolio>[] => [
  {
    header: 'ID',
    accessor: 'id',
  },

  {
    header: 'Banner',
    accessor: item => (
      <img
        src={`${IMAGE_BASE_URL}/${item.image_banner}`}
        alt={item.short_desc}
        className="h-12 w-20 object-cover rounded-md border"
      />
    ),
  },

  {
    header: 'Project Name',
    accessor: 'short_desc',
  },

  {
    header: 'Description',
    accessor: item => <p className="max-w-xs truncate text-sm">{item.description}</p>,
  },

  {
    header: 'Category',
    accessor: item => (
      <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-medium">
        {item.category}
      </span>
    ),
  },

  {
    header: 'Logos',
    accessor: item => (
      <div className="flex gap-2">
        {item.logo.map((img, idx) => (
          <img
            key={idx}
            src={`${IMAGE_BASE_URL}/${img}`}
            alt="logo"
            className="h-6 w-6 object-contain rounded border"
          />
        ))}
      </div>
    ),
  },

  {
    header: 'All Images',
    accessor: item => (
      <div className="flex gap-2">
        {item.all_image.map((img, idx) => (
          <img
            key={idx}
            src={`${IMAGE_BASE_URL}/${img}`}
            alt={`preview-${idx}`}
            className="h-10 w-14 object-cover rounded border"
          />
        ))}
      </div>
    ),
  },

  {
    header: 'Link',
    accessor: item => (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline flex items-center gap-1 text-sm"
      >
        View <ExternalLink className="h-3 w-3" />
      </a>
    ),
  },

  {
    header: 'Actions',
    accessor: item => (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30"
          onClick={() => onEdit(item)}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

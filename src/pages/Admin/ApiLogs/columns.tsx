import { formatDateTime } from '../../../lib/FormatTime'
import type { IColumn, Log } from '../../../type'

export const logColumns: IColumn<Log>[] = [
  {
    header: 'Method',
    accessor: item => (
      <span
        className={
          item.method === 'POST'
            ? 'text-green-500'
            : item.method === 'PATCH'
              ? 'text-blue-500'
              : item.method === 'DELETE'
                ? 'text-red-500'
                : 'text-gray-500'
        }
      >
        {item.method}
      </span>
    ),
  },
  {
    header: 'Path',
    accessor: 'path',
  },
  {
    header: 'Status',
    accessor: item => (
      <span
        className={
          item.status_code >= 200 && item.status_code < 300 ? 'text-green-500' : 'text-red-500'
        }
      >
        {item.status_code}
      </span>
    ),
  },
  {
    header: 'Execution',
    accessor: 'execution_time',
  },
  {
    header: 'IP',
    accessor: 'ip_address',
  },
  {
    header: 'Date',
    accessor: item => formatDateTime(item.created_at),
  },
]

import { result } from 'lodash'
import { useState } from 'react'
import { toast } from 'sonner'
import Table from '../../../components/Table'
import { Button } from '../../../components/ui/button'
import { useCleanupLogs } from '../../../hooks/Logs/useCleanLog'
import { useGetLogs } from '../../../hooks/Logs/useGetLogs'
import { logColumns } from './columns'

export default function Logs() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(5)
  const { data } = useGetLogs(page, size)
  const { mutate: cleanupLogs, isPending } = useCleanupLogs()
  const handleCleanup = () => {
    cleanupLogs(undefined, {
      onSuccess: res => {
        toast.success(res?.message || 'Logs cleaned up successfully')
      },
      onError: () => {
        toast.error('Failed to cleanup logs')
      },
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-5xl uppercase tracking-wide">Logs</h1>

        <Button
          onClick={handleCleanup}
          disabled={isPending}
          className="border cursor-pointer"
          size="lg"
          variant="destructive"
        >
          {isPending ? 'Cleaning...' : 'Cleanup Logs'}
        </Button>
      </div>
      <div className="my-10">
        <Table
          columns={logColumns}
          data={result(data, 'data.list', [])}
          currentPage={result(data, 'data.pagination.current_page', 1)}
          totalPages={result(data, 'data.pagination.total_pages', 1)}
          onPageChange={newPage => setPage(newPage)}
          pageSize={size}
          onSizeChange={newSize => {
            setSize(newSize)
            setPage(1)
          }}
        />
      </div>
    </div>
  )
}

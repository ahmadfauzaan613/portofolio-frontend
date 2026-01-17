import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table as TableRoot,
  TableRow,
} from '../components/ui/table'
import type { IDataTableProps } from '../type'

export default function Table<T>({
  columns,
  data,
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onSizeChange,
}: IDataTableProps<T>) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-card overflow-hidden">
        <TableRoot>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {columns.map((col, index) => (
                <TableHead key={index} className="font-bold text-foreground py-4">
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Pakai 'data' langsung karena sudah di-slice oleh API */}
            {data && data.length > 0 ? (
              data.map((item, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-muted/50 transition-colors">
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} className="py-4">
                      {typeof col.accessor === 'function'
                        ? col.accessor(item)
                        : (item[col.accessor] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableRoot>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-muted-foreground">Rows per page</p>
          <Select value={pageSize.toString()} onValueChange={value => onSizeChange(Number(value))}>
            <SelectTrigger className="h-8 w-17.5">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 50].map(size => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page)}
                className={`h-8 w-8 cursor-pointer ${currentPage === page ? 'pointer-events-none' : ''}`}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

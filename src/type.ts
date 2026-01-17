export interface IUpdatePassProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export interface IColumn<T> {
  header: string

  accessor: keyof T | ((item: T) => React.ReactNode)
}

export interface IDataTableProps<T> {
  columns: IColumn<T>[]
  data: T[]
}

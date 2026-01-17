import { result } from 'lodash'
import { useState } from 'react'
import PopUp from '../../../components/PopUp'
import Table from '../../../components/Table'
import { Button } from '../../../components/ui/button'
import { useGetAllportfolio } from '../../../hooks/Portofolio/useGetAllportfolio'
import type { Portfolio } from '../../../type'
import { PortfolioColumn } from './columns'

export default function Portofolio() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(5)
  const { data } = useGetAllportfolio(page, size)
  const [popupAdd, setPopupAdd] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Portfolio | null>(null)

  return (
    <div>
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-5xl uppercase tracking-wide">portfolio</h1>
        <Button
          onClick={() => {
            setPopupAdd(!popupAdd)
          }}
          className="border cursor-pointer"
          size="lg"
        >
          Add portfolio
        </Button>
      </div>
      <div className="my-10">
        <Table
          columns={PortfolioColumn}
          data={result(data, 'data.items', [])}
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

      <PopUp
        title={selectedItem ? 'Updte Portfolio' : 'Add New Portfolio'}
        open={popupAdd}
        setOpen={setPopupAdd}
      >
        <p>xxxx</p>
      </PopUp>
    </div>
  )
}

import { result } from 'lodash'
import { useState } from 'react'
import { toast } from 'sonner'
import PopUp from '../../../components/PopUp'
import Table from '../../../components/Table'
import { Button } from '../../../components/ui/button'
import { useDeleteCategory } from '../../../hooks/Categories/useDeleteCat'
import { useGetAllCategory } from '../../../hooks/Categories/useGetAllCat'
import { categoryColumn } from './Column'
import CreateCategoryForm from './CreateCategoryForm'

export default function Category() {
  const { data } = useGetAllCategory()
  const { mutate: deleteCategory, isPending: deleting } = useDeleteCategory()
  const [popupOpen, setPopupOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [popupDelete, setPopupDelete] = useState(false)

  const handleDeleteClick = (id: number) => {
    setDeleteId(id)
    setPopupDelete(true)
  }

  const handleEdit = (item: any) => {
    setEditing({
      id: item.id,
      name: item.name,
    })
    setPopupOpen(true)
  }

  const handleAdd = () => {
    setEditing(null)
    setPopupOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!deleteId) return

    deleteCategory(deleteId, {
      onSuccess: res => {
        toast.success(res.message || 'Experience deleted successfully')
        setPopupDelete(false)
        setDeleteId(null)
      },
      onError: () => {
        toast.error('Failed to delete experience')
      },
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-5xl uppercase tracking-wide">Category</h1>
        <Button onClick={handleAdd} className="border cursor-pointer" size="lg">
          Add Category
        </Button>
      </div>
      <div className="my-10">
        <Table
          columns={categoryColumn(handleEdit, handleDeleteClick)}
          data={result(data, 'data', [])}
          currentPage={0}
          totalPages={0}
          onPageChange={() => {}}
          pageSize={0}
          onSizeChange={() => {}}
        />
      </div>
      <PopUp
        title={editing ? 'Edit Category' : 'Add New Category'}
        open={popupOpen}
        setOpen={setPopupOpen}
      >
        <CreateCategoryForm
          key={editing?.id ?? 'create'}
          categoryId={editing?.id}
          defaultValues={editing ?? undefined}
          onSuccess={() => {
            setPopupOpen(false)
            setEditing(null)
          }}
        />
      </PopUp>
      <PopUp title="Delete Experience" open={popupDelete} setOpen={setPopupDelete}>
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this category?
            <span className="font-semibold text-red-500">This action cannot be undone</span>.
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setPopupDelete(false)}
              disabled={deleting}
            >
              Cancel
            </Button>

            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleConfirmDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </PopUp>
    </div>
  )
}

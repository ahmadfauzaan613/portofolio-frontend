import { result } from 'lodash'
import { useState } from 'react'
import { toast } from 'sonner'
import PopUp from '../../../components/PopUp'
import Table from '../../../components/Table'
import { Button } from '../../../components/ui/button'
import { useDeleteExperience } from '../../../hooks/Experience/useDeleteExp'
import { useGetExperiences } from '../../../hooks/Experience/useGetAllExp'
import { expColumns } from './columns'
import CreateExperienceForm from './CreateExperienceForm'

export default function Experiences() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(5)
  const { data } = useGetExperiences(page, size)
  const { mutate: deleteExperience, isPending: deleting } = useDeleteExperience()
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupDelete, setPopupDelete] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const handleDeleteClick = (id: number) => {
    setDeleteId(id)
    setPopupDelete(true)
  }

  const handleEdit = (item: any) => {
    setEditing(item)
    setPopupOpen(true)
  }

  const handleAdd = () => {
    setEditing(null)
    setPopupOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!deleteId) return

    deleteExperience(deleteId, {
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
        <h1 className="text-5xl uppercase tracking-wide">Experience</h1>
        <Button onClick={handleAdd} className="border cursor-pointer" size="lg">
          Add Experience
        </Button>
      </div>
      <div className="my-10">
        <Table
          columns={expColumns(handleEdit, handleDeleteClick)}
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
        title={editing ? 'Edit Experience' : 'Add New Experience'}
        open={popupOpen}
        setOpen={setPopupOpen}
      >
        <CreateExperienceForm
          experienceId={editing?.id}
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
            Are you sure you want to delete this experience?{' '}
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

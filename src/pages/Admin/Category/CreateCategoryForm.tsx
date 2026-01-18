import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { useCreateCategory } from '../../../hooks/Categories/useCreateCat'
import { useUpdateCategory } from '../../../hooks/Categories/useUpdateCat'
import type { CreateCategory } from '../../../type'

interface Props {
  onSuccess?: () => void
  defaultValues?: Partial<CreateCategory>
  categoryId?: number
}

export default function CreateCategoryForm({ onSuccess, defaultValues, categoryId }: Props) {
  const { mutate: createCategory, isPending: creating } = useCreateCategory()
  const { mutate: updateCategory, isPending: updating } = useUpdateCategory()
  const isSubmitting = creating || updating

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateCategory>({
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    if (defaultValues?.name) {
      setValue('name', defaultValues.name)
    }
  }, [defaultValues, setValue])

  const onSubmit = (data: CreateCategory) => {
    if (categoryId) {
      updateCategory(
        { id: categoryId, name: data.name },
        {
          onSuccess: res => {
            toast.success(res.message || 'Category updated successfully')
            onSuccess?.()
          },
          onError: () => {
            toast.error('Failed to update category')
          },
        }
      )
      return
    }

    createCategory(data, {
      onSuccess: res => {
        toast.success(res.message || 'Category created successfully')
        reset()
        onSuccess?.()
      },
      onError: () => {
        toast.error('Failed to create category')
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Category</Label>
        <Input
          {...register('name', { required: 'Name is required' })}
          placeholder="Category name"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving...' : categoryId ? 'Update Category' : 'Create Category'}
      </Button>
    </form>
  )
}

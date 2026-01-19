import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Textarea } from '../../../components/ui/textarea'
import { useCreateExperience } from '../../../hooks/Experience/useCreateExp'
import { useUpdateExperience } from '../../../hooks/Experience/useUpdateExp'
import type { CreateExperiencePayload, PropsExperience } from '../../../type'

export default function CreateExperienceForm({
  onSuccess,
  defaultValues,
  experienceId,
}: PropsExperience) {
  const { mutate: createExperience, isPending: creating } = useCreateExperience()
  const { mutate: updateExperience, isPending: updating } = useUpdateExperience()
  const isSubmitting = creating || updating
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateExperiencePayload>()

  const toDateInput = (value?: string) => (value ? value.split('T')[0] : undefined)

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        start_date: toDateInput(defaultValues.start_date),
        end_date: toDateInput(defaultValues.end_date),
      })
    }
  }, [defaultValues, reset])

  const onSubmit = (data: CreateExperiencePayload) => {
    if (experienceId) {
      updateExperience(
        { id: experienceId, payload: data },
        {
          onSuccess: res => {
            toast.success(res.message || 'Experience updated successfully')
            onSuccess?.()
          },
          onError: () => {
            toast.error('Failed to update experience')
          },
        }
      )
    } else {
      createExperience(data, {
        onSuccess: res => {
          toast.success(res.message || 'Experience added successfully')
          reset()
          onSuccess?.()
        },
        onError: () => {
          toast.error('Failed to add experience')
        },
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label className="mb-3">Company</Label>
        <Input
          {...register('company', { required: 'Company is required' })}
          placeholder="Company name"
        />
        {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}
      </div>

      <div>
        <Label className="mb-3">Role</Label>
        <Input {...register('role', { required: 'Role is required' })} placeholder="Role" />
        {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
      </div>

      <div>
        <Label className="mb-3">Description</Label>
        <Textarea
          {...register('description', { required: 'Description is required' })}
          placeholder="Describe your responsibility"
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <Label className="mb-3">Location</Label>
        <Input
          {...register('location', { required: 'Location is required' })}
          placeholder="Location"
        />
        {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-3">Start Date</Label>
          <Input type="date" {...register('start_date', { required: 'Start date is required' })} />
          {errors.start_date && <p className="text-sm text-red-500">{errors.start_date.message}</p>}
        </div>

        <div>
          <Label className="mb-3">End Date</Label>
          <Input
            type="date"
            {...register('end_date', {
              setValueAs: value => (value === '' ? undefined : value),
            })}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-white cursor-pointer text-black"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : experienceId ? 'Update Experience' : 'Save Experience'}
      </Button>
    </form>
  )
}

import { Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { useCreateProfile } from '../../hooks/Profile/useCreateProfile'
import { useGetAllProfile } from '../../hooks/Profile/useGetProfile'
import { useUpdateProfile } from '../../hooks/Profile/useUpdateProfile'
import type { ProfileFormValues } from '../../type'

export default function Profile() {
  const { data: profile, isLoading } = useGetAllProfile()
  const { mutate: createProfile, isPending: creating } = useCreateProfile()
  const { mutate: updateProfile, isPending: updating } = useUpdateProfile()
  const isSubmitting = creating || updating

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      role: '',
      about: '',
      links: [{ type: '', value: '' }],
    },
  })

  const onSubmit = (data: ProfileFormValues) => {
    if (profile?.id) {
      updateProfile(
        {
          id: profile.id,
          payload: {
            role: data.role,
            about: data.about,
            links: data.links,
          },
        },
        {
          onSuccess: res => {
            toast.success(res?.message || 'Profile updated successfully')
          },
          onError: (err: any) => {
            toast.error(err?.response?.data?.message || 'Failed to update profile')
          },
        }
      )
    } else {
      // ✅ CREATE
      createProfile(
        {
          role: data.role,
          about: data.about,
          links: data.links,
        },
        {
          onSuccess: res => {
            toast.success(res?.message || 'Profile created successfully')
          },
          onError: (err: any) => {
            toast.error(err?.response?.data?.message || 'Failed to create profile')
          },
        }
      )
    }
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  })

  useEffect(() => {
    if (profile) {
      reset({
        role: profile.role,
        about: profile.about,
        links: profile.links.length ? profile.links : [{ type: '', value: '' }],
      })
    }
  }, [profile, reset])

  if (isLoading) {
    return <p>Loading profile...</p>
  }

  return (
    <div>
      <h1 className="text-5xl uppercase tracking-wide">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
        <div>
          <Label htmlFor="role" className="mb-3">
            Role
          </Label>
          <Input
            {...register('role', { required: 'Role is required' })}
            name="role"
            id="role"
            placeholder="Role"
            className="h-12"
          />
          {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>}
        </div>
        <div>
          <Label htmlFor="about" className="mb-3">
            About
          </Label>
          <Textarea
            {...register('about', { required: 'About is required' })}
            placeholder="Type your message here."
            cols={12}
          />
          {errors.about && <p className="text-sm text-red-500 mt-1">{errors.about.message}</p>}
        </div>
        <div className="flex items-center justify-between my-10">
          <h2 className="text-2xl uppercase tracking-wide">Links</h2>
          <Button
            variant={'outline'}
            type="button"
            onClick={() => append({ type: '', value: '' })}
            className="cursor-pointer"
          >
            Add Link
          </Button>
        </div>
        <div className="space-y-5 max-h-100 overflow-y-auto pr-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start border-b pb-6 last:border-0">
              <div className="flex-1 space-y-3">
                <Input
                  {...register(`links.${index}.type` as const, {
                    required: 'Type is required',
                  })}
                  placeholder="Type (github, linkedin, etc)"
                  className="h-10"
                />
                <Input
                  {...register(`links.${index}.value` as const, {
                    required: 'URL is required',
                  })}
                  placeholder="Value (URL)"
                  className="h-10"
                />
              </div>

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:bg-red-50 mt-1"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="pt-6 flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-2/12 py-5 cursor-pointer bg-white text-black"
          >
            {isSubmitting ? 'Saving...' : profile?.id ? 'Update Profile' : 'Create Profile'}
          </Button>
        </div>
      </form>
    </div>
  )
}

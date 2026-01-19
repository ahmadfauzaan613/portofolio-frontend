import { result } from 'lodash'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Textarea } from '../../../components/ui/textarea'
import { useGetAllCategory } from '../../../hooks/Categories/useGetAllCat'
import { useCreatePortfolio } from '../../../hooks/Portofolio/useCreatePortfolio'
import { useUpdatePortfolio } from '../../../hooks/Portofolio/useUpdatePortfolio'
import type { CategoryData, CreatePortfolioForm, PropsPortfolio } from '../../../type'

export default function CreatePortfolioForm({
  onSuccess,
  defaultValues,
  portfolioId,
}: PropsPortfolio) {
  const { mutate: createPortfolio, isPending: creating } = useCreatePortfolio()
  const { mutate: updateExperience, isPending: updating } = useUpdatePortfolio()
  const { data: dataCategory } = useGetAllCategory()
  const isSubmitting = creating || updating

  const { register, handleSubmit, reset, setValue } = useForm<CreatePortfolioForm>({
    defaultValues: {
      logos: [],
      images: [],
    },
  })

  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title ?? '',
        short_desc: defaultValues.short_desc ?? '',
        description: defaultValues.description ?? '',
        link: defaultValues.link ?? '',
        category: defaultValues.category ?? '',
        logos: [],
        images: [],
      })
    }
  }, [defaultValues, reset])

  const [logoInputs, setLogoInputs] = useState([0])
  const [imageInputs, setImageInputs] = useState([0])
  const addLogoInput = () => {
    setLogoInputs(prev => [...prev, prev.length])
  }
  const addImageInput = () => {
    setImageInputs(prev => [...prev, prev.length])
  }
  const removeLogoInput = (index: number) => {
    setLogoInputs(prev => prev.filter((_, i) => i !== index))
  }
  const removeImageInput = (index: number) => {
    setImageInputs(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = (data: CreatePortfolioForm) => {
    const formData = new FormData()

    // =====================
    // TEXT FIELDS (AMAN)
    // =====================
    formData.append('title', data.title)
    formData.append('short_desc', data.short_desc)
    formData.append('description', data.description)
    formData.append('link', data.link)
    formData.append('category', data.category)

    // =====================
    // IMAGE BANNER
    // =====================
    if (data.imageBanner && data.imageBanner.length > 0) {
      formData.append('imageBanner', data.imageBanner[0])
    }

    // =====================
    // LOGO (ONLY IF USER UPLOAD)
    // =====================
    const validLogos = data.logos.filter(Boolean)
    if (validLogos.length > 0) {
      validLogos.forEach(file => {
        formData.append('logo', file as File)
      })
    }

    // =====================
    // ALL IMAGE (ONLY IF USER UPLOAD)
    // =====================
    const validImages = data.images.filter(Boolean)
    if (validImages.length > 0) {
      validImages.forEach(file => {
        formData.append('allImage', file as File)
      })
    }

    // =====================
    // CREATE vs UPDATE
    // =====================
    if (portfolioId) {
      updateExperience(
        { id: portfolioId, formData },
        {
          onSuccess: res => {
            toast.success(res.message || 'Portfolio updated successfully')
            onSuccess?.()
          },
          onError: () => toast.error('Failed to update portfolio'),
        }
      )
      return
    }

    createPortfolio(formData, {
      onSuccess: res => {
        toast.success(res.message || 'Portfolio created')
        reset()
        onSuccess?.()
      },
      onError: () => toast.error('Failed Created Portfolio'),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label className="mb-3">Title</Label>
        <Input {...register('title', { required: true })} />
      </div>
      <div>
        <Label className="mb-3">Image Banner</Label>
        <Input type="file" {...register('imageBanner', { required: true })} />
      </div>

      <div className="space-y-3">
        <Label className="mb-3">Logos</Label>

        {logoInputs.map((_, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              type="file"
              onChange={e => setValue(`logos.${index}`, e.target.files?.[0] ?? null)}
            />

            {logoInputs.length > 1 && (
              <Button type="button" variant="ghost" onClick={() => removeLogoInput(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addLogoInput}>
          Add Logo
        </Button>
      </div>

      <div className="space-y-3">
        <Label>All Images</Label>

        {imageInputs.map((_, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              type="file"
              onChange={e => setValue(`images.${index}`, e.target.files?.[0] ?? null)}
            />

            {imageInputs.length > 1 && (
              <Button type="button" variant="ghost" onClick={() => removeImageInput(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addImageInput}>
          Add Image
        </Button>
      </div>

      <div>
        <Label className="mb-3">Short Description</Label>
        <Input {...register('short_desc', { required: true })} />
      </div>

      <div>
        <Label className="mb-3">Description</Label>
        <Textarea {...register('description', { required: true })} />
      </div>

      <div>
        <Label className="mb-3">Project Link</Label>
        <Input {...register('link', { required: true })} />
      </div>

      <div>
        <Label className="mb-3">Category</Label>

        <select
          {...register('category')}
          className="w-full h-12 rounded-md border  px-3 text-sm"
          defaultValue=""
        >
          <option value="" disabled>
            Select category
          </option>

          {result(dataCategory, 'data', []).map((cat: CategoryData) => (
            <option key={cat.id} value={cat.category} className="text-black">
              {cat.category}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer bg-white text-black"
      >
        {isSubmitting ? 'Saving...' : portfolioId ? 'Update Portfolio' : 'Save Portfolio'}
      </Button>
    </form>
  )
}

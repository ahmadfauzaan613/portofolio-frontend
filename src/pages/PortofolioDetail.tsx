import { result } from 'lodash'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetDetailPort } from '../hooks/Portofolio/useGetDetailPort'

// shadcn
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// lucide
import { ExternalLink, X, ZoomIn } from 'lucide-react'

export default function PortofolioDetail() {
  const { id } = useParams<{ id: string }>()
  const portfolioId = id ? Number(id) : undefined

  const [activeImage, setActiveImage] = useState<string | null>(null)

  const { data, isLoading } = useGetDetailPort(portfolioId)
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL

  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <p className="text-sm uppercase tracking-widest">Loading...</p>
      </div>
    )
  }

  if (!data) return null

  return (
    <article className="pb-16">
      {/* CATEGORY */}
      <div className="mt-14 mb-4">
        <Badge variant="secondary" className="uppercase tracking-widest">
          {result(data, 'category', '')}
        </Badge>
      </div>

      {/* TITLE + CTA */}
      <div className="flex items-end justify-between gap-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          {result(data, 'title', '')}
        </h1>

        {result(data, 'link', '') && (
          <Button variant="ghost" size="sm" asChild className="uppercase tracking-widest gap-2">
            <a href={data.link} target="_blank" rel="noopener noreferrer">
              Demo
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>

      {/* HERO IMAGE */}
      <div className="relative my-14 h-[55vh] overflow-hidden rounded-2xl">
        <img
          src={`${IMAGE_BASE_URL}/${data.image_banner}`}
          alt={data.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent" />
      </div>

      {/* TECH STACK */}
      {result(data, 'logo', []).length > 0 && (
        <section className="my-16">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-5">
            Tech Stack
          </h2>

          <div className="flex flex-wrap items-center gap-6">
            {result(data, 'logo', []).map((img: string, idx: number) => (
              <div
                key={idx}
                className="p-2 rounded-md border bg-background hover:shadow-sm transition"
              >
                <img
                  src={`${IMAGE_BASE_URL}/${img}`}
                  alt="tech"
                  className="h-8 w-auto object-contain opacity-80"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTENT */}
      <div className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed">
        <p>{result(data, 'description', '')}</p>
      </div>

      {/* GALLERY */}
      {result(data, 'all_image', []).length > 0 && (
        <section className="mt-24">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-8">Preview</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {result(data, 'all_image', []).map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className="group relative overflow-hidden rounded-xl border focus:outline-none"
              >
                <img
                  src={`${IMAGE_BASE_URL}/${img}`}
                  alt={`gallery-${idx}`}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition">
                  <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition" />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* LIGHTBOX */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setActiveImage(null)} // klik OUTSIDE
        >
          {/* CONTENT */}
          <div
            onClick={e => e.stopPropagation()} // ⛔ stop bubbling
            className="relative"
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white"
              onClick={() => setActiveImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* IMAGE */}
            <img
              src={`${IMAGE_BASE_URL}/${activeImage}`}
              alt="preview"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </article>
  )
}

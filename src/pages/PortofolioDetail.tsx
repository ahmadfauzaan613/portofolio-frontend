import { result } from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetDetailPort } from '../hooks/Portofolio/useGetDetailPort'

// shadcn
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// lucide + motion
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, X, ZoomIn } from 'lucide-react'

export default function PortofolioDetail() {
  const { id } = useParams<{ id: string }>()
  const portfolioId = id ? Number(id) : undefined
  const navigate = useNavigate()
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const { data, isLoading } = useGetDetailPort(portfolioId)
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL

  // lock body scroll when lightbox open
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [activeImage])

  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <p className="text-sm uppercase tracking-widest">Loading...</p>
      </div>
    )
  }

  if (!data) return null

  const isNotEmptyString = (v?: string) => !!v && v.trim() !== ''
  const isNotEmptyArray = (v?: unknown[]) => Array.isArray(v) && v.length > 0

  return (
    <article className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* BACK */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-8 mb-6"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="uppercase tracking-widest gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </motion.div>

      {/* CATEGORY */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Badge variant="secondary" className="uppercase tracking-widest">
          {result(data, 'category', '')}
        </Badge>
      </motion.div>

      {/* TITLE + CTA */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl"
        >
          {result(data, 'title', '')}
        </motion.h1>

        {isNotEmptyString(data.link) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Button variant="outline" size="sm" asChild className="uppercase tracking-widest gap-2">
              <a href={data.link} target="_blank" rel="noopener noreferrer">
                Demo
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        )}
      </div>

      {/* HERO IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="
          relative my-12 sm:my-16
          h-[32vh] sm:h-[45vh] md:h-[55vh]
          overflow-hidden rounded-3xl
        "
      >
        <img
          src={`${IMAGE_BASE_URL}/${data.image_banner}`}
          alt={data.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
      </motion.div>

      {/* TECH STACK */}
      {isNotEmptyArray(data.logo) && (
        <section className="my-14 sm:my-20">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-4">
            {data.logo.map((img: string, idx: number) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 260 }}
                className="p-3 rounded-lg border bg-background shadow-sm"
              >
                <img
                  src={`${IMAGE_BASE_URL}/${img}`}
                  alt="tech"
                  className="h-8 w-auto opacity-80"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* DESCRIPTION */}
      <div className="max-w-3xl prose prose-neutral dark:prose-invert leading-relaxed text-base sm:text-lg">
        <p>{result(data, 'description', '')}</p>
      </div>

      {/* GALLERY */}
      {isNotEmptyArray(data.all_image) ? (
        <section className="mt-24">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-10">Preview</h2>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {data.all_image.map((img: string, idx: number) => (
              <motion.button
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setActiveImage(img)}
                className="group relative overflow-hidden rounded-xl border"
              >
                <img
                  src={`${IMAGE_BASE_URL}/${img}`}
                  alt={`gallery-${idx}`}
                  className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                  <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </section>
      ) : (
        <section className="mt-24 text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Preview not available
          </p>
          <p className="mt-2 text-muted-foreground">Visual previews will be added in the future.</p>
        </section>
      )}

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="relative"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white"
                onClick={() => setActiveImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>

              <img
                src={`${IMAGE_BASE_URL}/${activeImage}`}
                alt="preview"
                className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

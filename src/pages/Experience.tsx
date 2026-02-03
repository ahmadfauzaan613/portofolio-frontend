import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { result } from 'lodash'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import ExperienceCard from '../components/ExperienceCard'
import { Button } from '../components/ui/button'
import { useGetExperiences } from '../hooks/Experience/useGetAllExp'
import { cn } from '../lib/utils'
import type { Experience } from '../type'

export default function Experience() {
  const [page, setPage] = useState(1)
  const { data: experienceData } = useGetExperiences(page, 3)

  const onPageChange = (newPage: number) => {
    if (newPage < 1) return
    const totalPages = result(experienceData, 'data.pagination.total_pages', 1)
    if (newPage > totalPages) return
    setPage(newPage)
  }

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const items = result(experienceData, 'data.items', [])

  return (
    <div className="px-4">
      {/* TITLE */}
      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate="show"
        className="
          text-3xl sm:text-4xl md:text-5xl
          uppercase tracking-wide font-black
          mt-10 sm:mt-14
        "
      >
        Experience
      </motion.h1>

      {/* EMPTY STATE */}
      <AnimatePresence>
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[40vh] grid place-items-center text-center"
          >
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">No Experience Yet</h2>
              <p className="text-muted-foreground text-sm">
                Your professional journey will appear here.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIST */}
      {items.length > 0 && (
        <motion.div
          key={page}
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="mt-8 sm:mt-12 space-y-3 sm:space-y-4"
        >
          {items.map((exp: Experience) => (
            <motion.div key={exp.id} variants={itemVariants}>
              <ExperienceCard
                id={exp.id}
                company={exp.company}
                role={exp.role}
                description={exp.description}
                location={exp.location}
                start_date={exp.start_date}
                end_date={exp.end_date}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* PAGINATION */}
      <div
        className={cn(
          'mt-8 sm:mt-12 flex flex-wrap items-center justify-end gap-2',
          items.length === 0 && 'hidden'
        )}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            onPageChange(result(experienceData, 'data.pagination.current_page', 1) - 1)
          }
          disabled={result(experienceData, 'data.pagination.current_page', 1) === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-wrap gap-1">
          {Array.from(
            { length: result(experienceData, 'data.pagination.total_pages', 1) },
            (_, i) => i + 1
          ).map(p => (
            <Button
              key={p}
              size="sm"
              variant={
                result(experienceData, 'data.pagination.current_page', 1) === p
                  ? 'default'
                  : 'outline'
              }
              onClick={() => onPageChange(p)}
              disabled={result(experienceData, 'data.pagination.current_page', 1) === p}
              className="h-8 w-8"
            >
              {p}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            onPageChange(result(experienceData, 'data.pagination.current_page', 1) + 1)
          }
          disabled={
            result(experienceData, 'data.pagination.current_page', 1) ===
            result(experienceData, 'data.pagination.total_pages', 1)
          }
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

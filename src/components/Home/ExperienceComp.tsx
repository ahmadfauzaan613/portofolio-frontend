import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'
import type { Experience, IExperience } from '../../type'
import ExperienceCard from '../ExperienceCard'
import { Button } from '../ui/button'

export default function ExperienceComp({
  currentPage,
  totalPages,
  onPageChange,
  dataExperience,
}: IExperience) {
  const navigate = useNavigate()
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  const staggerList: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 px-4">
      {/* LEFT / INTRO */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="lg:col-span-4 flex flex-col"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black uppercase tracking-wide leading-none">
          Experience
        </h1>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground text-justify">
          Over nearly four years of professional experience, I have worked on multiple web-based
          products, contributing to scalable frontend architectures and reliable backend services.
          My work focuses on building reusable components, integrating APIs, optimizing performance,
          and maintaining clean, maintainable codebases using React and Next.js.
        </p>

        <div className={cn(dataExperience?.length === 0 && 'hidden', 'mt-6')}>
          <p
            onClick={() => navigate('/experience')}
            className="text-xs uppercase tracking-widest cursor-pointer opacity-70 hover:opacity-100 transition"
          >
            View Experience →
          </p>
        </div>
      </motion.div>

      {/* RIGHT / LIST */}
      <motion.div
        variants={staggerList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="lg:col-span-8 space-y-4"
      >
        {dataExperience && dataExperience.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[60vh] grid place-items-center text-center"
          >
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">No Experience Yet</h2>
              <p className="text-muted-foreground text-sm">
                Your professional journey will appear here.
              </p>
            </div>
          </motion.div>
        ) : (
          dataExperience.map((exp: Experience) => (
            <motion.div key={exp.id} variants={fadeUp}>
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
          ))
        )}

        {/* PAGINATION */}
        <div
          className={cn(
            'justify-end items-center gap-2 pt-4 hidden',
            dataExperience && dataExperience.length === 0 && 'hidden'
          )}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page)}
                disabled={currentPage === page}
                className="h-8 w-8"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

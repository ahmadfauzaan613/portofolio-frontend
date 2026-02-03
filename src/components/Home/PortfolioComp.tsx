import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'
import type { PortfolioForm } from '../../type'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

export interface IProject {
  dataPortfolio: PortfolioForm[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function PortfolioComp({
  dataPortfolio,
  currentPage,
  totalPages,
  onPageChange,
}: IProject) {
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL
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

  const staggerGrid: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  return (
    <div className="px-4">
      {/* HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-6xl uppercase tracking-wide font-black">
          Portfolio
        </h1>

        <p
          onClick={() => navigate('/portfolio')}
          className={cn(
            'text-xs uppercase tracking-widest cursor-pointer opacity-70 hover:opacity-100 transition',
            dataPortfolio.length === 0 && 'hidden'
          )}
        >
          View Project →
        </p>
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={staggerGrid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className={cn(
          'mt-8 sm:mt-12',
          dataPortfolio.length > 0 && 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        )}
      >
        {dataPortfolio.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-[40vh] grid place-items-center text-center"
          >
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">No Portfolio Yet</h2>
            </div>
          </motion.div>
        ) : (
          dataPortfolio.map(item => (
            <motion.div key={item.id} variants={fadeUp}>
              <Card
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/portfolio/${item.id}`)}
                onKeyDown={e => e.key === 'Enter' && navigate(`/portfolio/${item.id}`)}
                className={cn(
                  'group cursor-pointer overflow-hidden border border-border',
                  'transition-all duration-300 ease-out',
                  'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10',
                  'focus-visible:ring-2 focus-visible:ring-ring',
                  'rounded-xl p-0'
                )}
              >
                {/* CONTENT */}
                <div className="flex flex-col justify-between p-5 h-48">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {item.category}
                    </p>

                    <h2 className="text-lg font-extrabold uppercase leading-tight tracking-tight line-clamp-2">
                      {item.title}
                    </h2>

                    <p className="text-xs uppercase tracking-widest text-muted-foreground line-clamp-2">
                      {item.short_desc}
                    </p>
                  </div>

                  <span className="mt-4 text-xs uppercase tracking-widest text-primary opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    View Project →
                  </span>
                </div>

                {/* IMAGE */}
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img
                    src={`${IMAGE_BASE_URL}/${item.image_banner}`}
                    alt={item.short_desc}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* PAGINATION */}
      <div
        className={cn(
          'mt-10 hidden justify-end items-center gap-2',
          dataPortfolio.length === 0 && 'hidden'
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
    </div>
  )
}

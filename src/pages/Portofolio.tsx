import { motion } from 'framer-motion'
import { result } from 'lodash'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { useGetAllportfolio } from '../hooks/Portofolio/useGetAllportfolio'
import { cn } from '../lib/utils'
import type { PortfolioForm } from '../type'

export default function Portofolio() {
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL
  const navigate = useNavigate()
  const [pagePortfolio, setPortfolio] = useState(1)
  const { data: portfolioData } = useGetAllportfolio(pagePortfolio, 8)
  const onPageChange = (newPage: number) => {
    if (newPage < 1) return
    const totalPages = result(portfolioData, 'data.pagination.total_pages', 1)
    if (newPage > totalPages) return
    setPortfolio(newPage)
  }
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide mt-16 mb-12"
      >
        Portfolio
      </motion.h1>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.08 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {result(portfolioData, 'data.items', []).map((item: PortfolioForm) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
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
                'p-0 rounded-xl'
              )}
            >
              {/* CONTENT */}
              <div className="flex flex-col justify-between p-5 h-47.5">
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
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={`${IMAGE_BASE_URL}/${item.image_banner}`}
                  alt={item.short_desc}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <div
        className={cn(
          'mt-10 flex flex-wrap items-center justify-end gap-2',
          result(portfolioData, 'data.items', []).length === 0 && 'hidden'
        )}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(result(portfolioData, 'data.pagination.current_page', 1) - 1)}
          disabled={result(portfolioData, 'data.pagination.current_page', 1) === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-wrap gap-1">
          {Array.from(
            { length: result(portfolioData, 'data.pagination.total_pages', 1) },
            (_, i) => i + 1
          ).map(page => (
            <Button
              key={page}
              size="sm"
              variant={
                result(portfolioData, 'data.pagination.current_page', 1) === page
                  ? 'default'
                  : 'outline'
              }
              onClick={() => onPageChange(page)}
              className="h-8 w-8"
              disabled={result(portfolioData, 'data.pagination.current_page', 1) === page}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(result(portfolioData, 'data.pagination.current_page', 1) + 1)}
          disabled={
            result(portfolioData, 'data.pagination.current_page', 1) ===
            result(portfolioData, 'data.pagination.total_pages', 1)
          }
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

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
      <h1 className="text-5xl uppercase tracking-wide mt-10">Portfolio</h1>
      <div className="grid grid-cols-4 mt-10 gap-3">
        {result(portfolioData, 'data.items', []).map((item: PortfolioForm) => (
          <Card
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/portfolio/${item.id}`)}
            onKeyDown={e => e.key === 'Enter' && navigate(`/portfolio/${item.id}`)}
            className={cn(
              'group cursor-pointer overflow-hidden rounded-none border border-border',
              'transition-all duration-300 ease-out',
              'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10',
              'focus-visible:ring-2 focus-visible:ring-ring',
              'p-0'
            )}
          >
            {/* CONTENT */}
            <div className="flex flex-col justify-between h-55 p-5">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {item.category}
                </p>

                <h2 className="text-xl font-extrabold uppercase leading-tight tracking-tight line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-[12px] uppercase tracking-widest text-muted-foreground line-clamp-2">
                  {item.short_desc}
                </p>
              </div>

              <span className="text-xs uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View Project →
              </span>
            </div>

            <div className="relative h-65 overflow-hidden">
              <img
                src={`${IMAGE_BASE_URL}/${item.image_banner}`}
                alt={item.short_desc}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Card>
        ))}
      </div>
      <div
        className={`${result(portfolioData, 'data.items', []).length === 0 && 'hidden'} flex items-center justify-end space-x-2 mt-5`}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(result(portfolioData, 'data.pagination.current_page', 1) - 1)}
          disabled={result(portfolioData, 'data.pagination.current_page', 1) === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          {Array.from(
            { length: result(portfolioData, 'data.pagination.total_pages', 1) },
            (_, i) => i + 1
          ).map(page => (
            <Button
              key={page}
              variant={
                result(portfolioData, 'data.pagination.current_page', 1) === page
                  ? 'default'
                  : 'outline'
              }
              size="sm"
              onClick={() => onPageChange(page)}
              className={`h-8 w-8 cursor-pointer ${result(portfolioData, 'data.pagination.current_page', 1) === page ? 'pointer-events-none' : ''}`}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
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

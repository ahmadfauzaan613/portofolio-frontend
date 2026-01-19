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
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-8xl uppercase tracking-wide">Portfolio</h1>
        <p className="text-xs uppercase tracking-widest cursor-pointer transition-opacity duration-300 ">
          View Project →
        </p>
      </div>
      <div className={`gap-8 ${dataPortfolio.length !== 0 && 'grid grid-cols-3'} mt-20`}>
        {dataPortfolio.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-3xl text-center uppercase tracking-wide">No Data Found</p>
          </div>
        ) : (
          dataPortfolio.map((item: PortfolioForm) => (
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
          ))
        )}
        {}
      </div>
      <div
        className={`${dataPortfolio.length === 0 && 'hidden'} flex justify-end items-center gap-2 mt-10`}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer"
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
              className={`h-8 w-8 cursor-pointer ${currentPage === page ? 'pointer-events-none' : ''}`}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

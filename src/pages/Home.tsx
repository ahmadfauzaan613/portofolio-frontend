import { result } from 'lodash'
import { useState } from 'react'
import ExperienceComp from '../components/Home/ExperienceComp'

import { useNavigate } from 'react-router-dom'
import ProfileComp from '../components/Home/ProfileComp'
import { Card } from '../components/ui/card'
import { useGetExperiences } from '../hooks/Experience/useGetAllExp'
import { useGetAllportfolio } from '../hooks/Portofolio/useGetAllportfolio'
import { useGetAllProfile } from '../hooks/Profile/useGetProfile'
import { cn } from '../lib/utils'
import type { PortfolioForm } from '../type'
export default function Home() {
  const [page, setPage] = useState(1)
  const { data: experienceData } = useGetExperiences(page, 3)
  const { data: profile } = useGetAllProfile()

  const [pagePortfolio, setPagePortfolio] = useState(1)
  const { data: portfolioData } = useGetAllportfolio(page, 3)

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL
  const navigate = useNavigate()

  return (
    <div>
      <section id="home" className="min-h-screen snap-start pt-28">
        <ProfileComp
          role={result(profile, 'role', '')}
          about={result(profile, 'about', '')}
          dataLink={result(profile, 'links', [])}
        />
      </section>
      {/* EXPERIENCE */}
      <section id="experience" className="min-h-screen snap-start pt-28">
        <ExperienceComp
          currentPage={result(experienceData, 'data.pagination.current_page', 1)}
          totalPages={result(experienceData, 'data.pagination.total_pages', 1)}
          onPageChange={newPage => setPage(newPage)}
          dataExperience={result(experienceData, 'data.items', [])}
        />
      </section>

      {/* portfolio */}
      <section id="portfolio" className="min-h-screen snap-start pt-28">
        <h1 className="text-8xl uppercase tracking-wide">Portfolio</h1>
        <div className="gap-8 grid grid-cols-3 mt-20">
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
      </section>
    </div>
  )
}

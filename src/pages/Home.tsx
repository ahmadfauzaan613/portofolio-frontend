import { result } from 'lodash'
import { useState } from 'react'
import ExperienceComp from '../components/Home/ExperienceComp'

import PortfolioComp from '../components/Home/PortfolioComp'
import ProfileComp from '../components/Home/ProfileComp'
import { useGetExperiences } from '../hooks/Experience/useGetAllExp'
import { useGetAllportfolio } from '../hooks/Portofolio/useGetAllportfolio'
import { useGetAllProfile } from '../hooks/Profile/useGetProfile'

export default function Home() {
  const [page, setPage] = useState(1)
  const { data: experienceData } = useGetExperiences(page, 3)
  const { data: profile } = useGetAllProfile()
  const [pagePortfolio, setPortfolio] = useState(1)
  const { data: portfolioData } = useGetAllportfolio(pagePortfolio, 6)

  return (
    <div>
      <section id="home" className="min-h-svh pt-24 md:pt-28 md:snap-start">
        <ProfileComp
          role={result(profile, 'role', '')}
          about={result(profile, 'about', '')}
          dataLink={result(profile, 'links', [])}
        />
      </section>
      {/* EXPERIENCE */}
      <section id="experience" className="min-h-svh pt-24 md:pt-28 md:snap-start">
        <ExperienceComp
          currentPage={result(experienceData, 'data.pagination.current_page', 1)}
          totalPages={result(experienceData, 'data.pagination.total_pages', 1)}
          onPageChange={newPage => setPage(newPage)}
          dataExperience={result(experienceData, 'data.items', [])}
        />
      </section>

      {/* portfolio */}
      <section id="portfolio" className="min-h-svh pt-24 md:pt-28 md:snap-start">
        <PortfolioComp
          currentPage={result(portfolioData, 'data.pagination.current_page', 1)}
          totalPages={result(portfolioData, 'data.pagination.total_pages', 1)}
          onPageChange={newPage => setPortfolio(newPage)}
          dataPortfolio={result(portfolioData, 'data.items', [])}
        />
      </section>
    </div>
  )
}

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
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
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-4 flex flex-col">
        <h1 className="text-6xl font-black uppercase tracking-wide leading-none">Experience</h1>
        <p className="text-sm leading-relaxed text-muted-foreground text-justify mt-5">
          Over nearly four years of professional experience, I have worked on multiple web-based
          products, contributing to scalable frontend architectures and reliable backend services.
          My work focuses on building reusable components, integrating APIs, optimizing performance,
          and maintaining clean, maintainable codebases using React and Next.js.
        </p>
        <div className={`${dataExperience && dataExperience.length === 0 && 'hidden'} mt-10`}>
          <p
            onClick={() => navigate('/experience')}
            className="text-xs uppercase tracking-widest cursor-pointer transition-opacity duration-300 "
          >
            View Experience →
          </p>
        </div>
      </div>
      <div className="col-span-8 space-y-6">
        {dataExperience && dataExperience.length === 0 ? (
          <p className="text-9xl text-center uppercase tracking-wide">No Data Found</p>
        ) : (
          dataExperience.map((exp: Experience) => (
            <ExperienceCard
              id={exp.id}
              company={exp.company}
              role={exp.role}
              description={exp.description}
              location={exp.location}
              start_date={exp.start_date}
              end_date={exp.end_date}
            />
          ))
        )}
        <div
          className={`${dataExperience && dataExperience.length === 0 && 'hidden'} flex justify-end items-center gap-2 `}
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
    </div>
  )
}

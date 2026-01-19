import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatPeriod } from '../../lib/FormatTime'
import type { Experience, IExperience } from '../../type'
import { Button } from '../ui/button'

export default function ExperienceComp({
  currentPage,
  totalPages,
  onPageChange,
  dataExperience,
}: IExperience) {
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
          <p className="text-xs uppercase tracking-widest cursor-pointer transition-opacity duration-300 ">
            View Experience →
          </p>
        </div>
      </div>
      <div className="col-span-8 space-y-6">
        {dataExperience && dataExperience.length === 0 ? (
          <p className="text-9xl text-center uppercase tracking-wide">No Data Found</p>
        ) : (
          dataExperience.map((exp: Experience) => (
            <div key={exp.id} className="border border-border p-5 space-y-4">
              <div>
                <h2 className="text-base font-semibold uppercase tracking-wider">{exp.company}</h2>
                <p className="text-sm font-medium pt-2">{exp.role}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>

              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
                <span>{exp.location}</span>
                <span>{formatPeriod(exp.start_date, exp.end_date)}</span>
              </div>
            </div>
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

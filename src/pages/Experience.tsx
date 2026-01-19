import { result } from 'lodash'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import ExperienceCard from '../components/ExperienceCard'
import { Button } from '../components/ui/button'
import { useGetExperiences } from '../hooks/Experience/useGetAllExp'
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
  return (
    <div>
      <h1 className="text-5xl uppercase tracking-wide mt-10">Experience</h1>
      {result(experienceData, 'data.items', []) &&
      result(experienceData, 'data.items', []).length === 0 ? (
        <div className="h-screen grid place-items-center text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tight">No Data Found</h1>
          </div>
        </div>
      ) : (
        <div className="mt-10 space-y-3">
          {result(experienceData, 'data.items', []).map((exp: Experience) => (
            <ExperienceCard
              id={exp.id}
              company={exp.company}
              role={exp.role}
              description={exp.description}
              location={exp.location}
              start_date={exp.start_date}
              end_date={exp.end_date}
            />
          ))}
        </div>
      )}
      <div
        className={`${result(experienceData, 'data.items', []).length === 0 && 'hidden'} flex items-center justify-end space-x-2 mt-5`}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onPageChange(result(experienceData, 'data.pagination.current_page', 1) - 1)
          }
          disabled={result(experienceData, 'data.pagination.current_page', 1) === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          {Array.from(
            { length: result(experienceData, 'data.pagination.total_pages', 1) },
            (_, i) => i + 1
          ).map(page => (
            <Button
              key={page}
              variant={
                result(experienceData, 'data.pagination.current_page', 1) === page
                  ? 'default'
                  : 'outline'
              }
              size="sm"
              onClick={() => onPageChange(page)}
              className={`h-8 w-8 cursor-pointer ${result(experienceData, 'data.pagination.current_page', 1) === page ? 'pointer-events-none' : ''}`}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
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

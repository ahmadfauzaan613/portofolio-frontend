import { formatPeriod } from '../lib/FormatTime'
import type { Experience } from '../type'

export default function ExperienceCard({
  id,
  company,
  role,
  description,
  location,
  start_date,
  end_date,
}: Experience) {
  return (
    <div key={id} className="border border-border p-5 space-y-4">
      <div>
        <h2 className="text-base font-semibold uppercase tracking-wider">{company}</h2>
        <p className="text-sm font-medium pt-2">{role}</p>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
        <span>{location}</span>
        <span>{formatPeriod(start_date, end_date)}</span>
      </div>
    </div>
  )
}

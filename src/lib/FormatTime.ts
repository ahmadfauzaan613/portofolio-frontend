export const formatPeriod = (start: string, end?: string | null) => {
  const startDate = new Date(start).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  if (!end) return `${startDate} - Present`

  const endDate = new Date(end).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  return `${startDate} - ${endDate}`
}

export const formatDateTime = (date: string) =>
  new Date(date).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

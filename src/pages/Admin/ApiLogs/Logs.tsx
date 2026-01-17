import Table from '../../../components/Table'
import { expColumns, type Experience } from './columns'

export default function Logs() {
  const dummyData: Experience[] = [
    { id: 1, role: 'Frontend Developer', company: 'Google', period: '2023 - Present' },
    { id: 2, role: 'Backend Engineer', company: 'Meta', period: '2022 - 2023' },
    { id: 3, role: 'Frontend Developer', company: 'Google', period: '2023 - Present' },
    { id: 4, role: 'Backend Engineer', company: 'Meta', period: '2022 - 2023' },
    { id: 5, role: 'Frontend Developer', company: 'Google', period: '2023 - Present' },
    { id: 6, role: 'Backend Engineer', company: 'Meta', period: '2022 - 2023' },
    { id: 7, role: 'Frontend Developer', company: 'Google', period: '2023 - Present' },
    { id: 9, role: 'Backend Engineer', company: 'Meta', period: '2022 - 2023' },
    { id: 9, role: 'Frontend Developer', company: 'Google', period: '2023 - Present' },
    { id: 10, role: 'Backend Engineer', company: 'Meta', period: '2022 - 2023' },
    { id: 11, role: 'Frontend Developer', company: 'Google', period: '2023 - Present' },
    { id: 12, role: 'Backend Engineer', company: 'Meta', period: '2022 - 2023' },
  ]
  return (
    <div>
      <h1 className="text-5xl uppercase tracking-wide">Logs</h1>
      <div className="my-10">
        <Table columns={expColumns} data={dummyData} />
      </div>
    </div>
  )
}

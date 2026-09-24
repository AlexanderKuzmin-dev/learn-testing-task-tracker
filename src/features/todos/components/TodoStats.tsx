import { useTodoStats } from '../hooks/useTodoStats'

export function TodoStats() {
  const stats = useTodoStats()
  if (!stats) return null

  return (
    <section aria-label="Статистика" className="stats">
      <span>
        Всего: <strong data-testid="stats-total">{stats.total}</strong>
      </span>
      <span>
        Выполнено: <strong data-testid="stats-completed">{stats.completed}</strong>
      </span>
      <span>
        Прогресс:{' '}
        <strong data-testid="stats-percent">{stats.completionPercent}%</strong>
      </span>
    </section>
  )
}

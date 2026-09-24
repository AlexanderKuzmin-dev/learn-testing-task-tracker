import type { Todo, TodoStatistics } from '../types'

export function calculateStats(todos: Todo[]): TodoStatistics {
  const total = todos.length
  const completed = todos.filter((todo) => todo.completed).length

  return {
    total,
    completed,
    active: total - completed,
    completionPercent: total === 0 ? 0 : Math.round((completed / total) * 100),
  }
}

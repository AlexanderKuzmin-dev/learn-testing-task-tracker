import type { Todo, TodoFilters } from '../types'

export function filterTodos(todos: Todo[], filters: TodoFilters): Todo[] {
  const query = filters.search.trim().toLowerCase()

  return todos.filter((todo) => {
    if (filters.status === 'completed' && !todo.completed) return false
    if (filters.status === 'active' && todo.completed) return false
    if (filters.userId !== null && todo.userId !== filters.userId) return false
    if (query && !todo.title.toLowerCase().includes(query)) return false
    return true
  })
}

import { useMemo } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectTodoFilters, selectVisibleCount } from '../todoFiltersSlice'
import type { Todo } from '../types'
import { filterTodos } from '../utils/filterTodos'
import { paginate } from '../utils/paginate'

export function useVisibleTodos(todos: Todo[]) {
  const filters = useAppSelector(selectTodoFilters)
  const visibleCount = useAppSelector(selectVisibleCount)

  const filtered = useMemo(() => filterTodos(todos, filters), [todos, filters])
  const visible = useMemo(
    () => paginate(filtered, visibleCount),
    [filtered, visibleCount],
  )

  return {
    visible,
    filteredCount: filtered.length,
    hasMore: visible.length < filtered.length,
  }
}

import { useMemo } from 'react'
import { useGetTodosQuery } from '../todosApi'
import { calculateStats } from '../utils/calculateStats'

export function useTodoStats() {
  const { data } = useGetTodosQuery()
  return useMemo(() => (data ? calculateStats(data) : null), [data])
}

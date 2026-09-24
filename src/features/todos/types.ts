export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type NewTodo = Omit<Todo, 'id'>

export type TodoChanges = Partial<Pick<Todo, 'title' | 'completed'>>

export type StatusFilter = 'all' | 'completed' | 'active'

export interface TodoFilters {
  status: StatusFilter
  userId: number | null
  search: string
}

export interface TodoStatistics {
  total: number
  completed: number
  active: number
  completionPercent: number
}

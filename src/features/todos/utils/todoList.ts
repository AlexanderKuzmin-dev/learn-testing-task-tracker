import { SERVER_TODOS_COUNT } from '../constants'
import type { Todo, TodoChanges } from '../types'

// Иммутабельные операции над списком: используются при оптимистичных обновлениях кэша.

export function getNextTodoId(todos: Todo[]): number {
  return todos.reduce((max, todo) => Math.max(max, todo.id), SERVER_TODOS_COUNT) + 1
}

export function addTodoToList(todos: Todo[], todo: Todo): Todo[] {
  return [todo, ...todos]
}

export function updateTodoInList(
  todos: Todo[],
  id: number,
  changes: TodoChanges,
): Todo[] {
  return todos.map((todo) => (todo.id === id ? { ...todo, ...changes } : todo))
}

export function removeTodoFromList(todos: Todo[], id: number): Todo[] {
  return todos.filter((todo) => todo.id !== id)
}

// Задачи, созданные на клиенте, на сервере не существуют (PATCH/PUT вернут 500).
export function isServerTodoId(id: number): boolean {
  return id <= SERVER_TODOS_COUNT
}

import { useState } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { Button } from '../../../components/Button'
import { useVisibleTodos } from '../hooks/useVisibleTodos'
import { showMore } from '../todoFiltersSlice'
import { useUpdateTodoMutation } from '../todosApi'
import type { Todo } from '../types'
import { DeleteTodoDialog } from './DeleteTodoDialog'
import { EditTodoModal } from './EditTodoModal'
import { TodoList } from './TodoList'

interface TodosContentProps {
  todos: Todo[]
}

export function TodosContent({ todos }: TodosContentProps) {
  const dispatch = useAppDispatch()
  const { visible, filteredCount, hasMore } = useVisibleTodos(todos)
  const [updateTodo] = useUpdateTodoMutation()

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null)
  const [toggleError, setToggleError] = useState<string | null>(null)

  async function handleToggle(todo: Todo) {
    setToggleError(null)
    try {
      await updateTodo({
        id: todo.id,
        changes: { completed: !todo.completed },
      }).unwrap()
    } catch {
      // Оптимистичное изменение уже откатилось в onQueryStarted.
      setToggleError('Не удалось обновить задачу')
    }
  }

  return (
    <>
      {toggleError && (
        <p role="alert" className="field-error">
          {toggleError}
        </p>
      )}
      <p>
        Показано {visible.length} из {filteredCount}
      </p>
      <TodoList
        todos={visible}
        onToggle={handleToggle}
        onEdit={setEditingTodo}
        onDelete={setDeletingTodo}
      />
      {hasMore && <Button onClick={() => dispatch(showMore())}>Показать ещё</Button>}

      {editingTodo && (
        <EditTodoModal todo={editingTodo} onClose={() => setEditingTodo(null)} />
      )}
      {deletingTodo && (
        <DeleteTodoDialog todo={deletingTodo} onClose={() => setDeletingTodo(null)} />
      )}
    </>
  )
}

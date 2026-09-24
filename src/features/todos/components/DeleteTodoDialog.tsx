import { useState } from 'react'
import { ConfirmDialog } from '../../../components/ConfirmDialog'
import { useDeleteTodoMutation } from '../todosApi'
import type { Todo } from '../types'

interface DeleteTodoDialogProps {
  todo: Todo
  onClose: () => void
}

export function DeleteTodoDialog({ todo, onClose }: DeleteTodoDialogProps) {
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation()
  const [error, setError] = useState<string | null>(null)

  async function handleConfirm() {
    setError(null)
    try {
      await deleteTodo(todo.id).unwrap()
      onClose()
    } catch {
      setError('Не удалось удалить задачу')
    }
  }

  return (
    <ConfirmDialog
      title="Удаление задачи"
      message={`Точно удалить «${todo.title}»?`}
      confirmLabel="Удалить"
      isLoading={isLoading}
      error={error}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  )
}

import { Modal } from '../../../components/Modal'
import { useUpdateTodoMutation } from '../todosApi'
import type { Todo } from '../types'
import { TodoForm } from './TodoForm'

interface EditTodoModalProps {
  todo: Todo
  onClose: () => void
}

export function EditTodoModal({ todo, onClose }: EditTodoModalProps) {
  const [updateTodo] = useUpdateTodoMutation()

  return (
    <Modal title="Редактирование задачи" onClose={onClose}>
      <TodoForm
        initialValues={{ title: todo.title, userId: todo.userId }}
        submitLabel="Сохранить"
        onCancel={onClose}
        onSubmit={async ({ title }) => {
          await updateTodo({ id: todo.id, changes: { title } }).unwrap()
          onClose()
        }}
      />
    </Modal>
  )
}

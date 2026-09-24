import { Link } from 'react-router-dom'
import { Button } from '../../../components/Button'
import type { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (todo: Todo) => void
  onEdit: (todo: Todo) => void
  onDelete: (todo: Todo) => void
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  return (
    <li className={todo.completed ? 'todo-item todo-item-done' : 'todo-item'}>
      <input
        type="checkbox"
        checked={todo.completed}
        aria-label={`Выполнено: ${todo.title}`}
        onChange={() => onToggle(todo)}
      />
      <Link to={`/todos/${todo.id}`} className="todo-title">
        {todo.title}
      </Link>
      <Button onClick={() => onEdit(todo)}>Изменить</Button>
      <Button variant="danger" onClick={() => onDelete(todo)}>
        Удалить
      </Button>
    </li>
  )
}

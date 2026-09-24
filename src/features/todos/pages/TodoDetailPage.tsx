import { Link, useParams } from 'react-router-dom'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { LoadingIndicator } from '../../../components/LoadingIndicator'
import { NotFound } from '../../../components/NotFound'
import { isNotFoundError } from '../../../utils/isNotFoundError'
import { useGetUserByIdQuery } from '../../users/usersApi'
import { useGetTodoByIdQuery } from '../todosApi'
import { parseTodoId } from '../utils/parseTodoId'

export function TodoDetailPage() {
  const id = parseTodoId(useParams().id)
  const todoQuery = useGetTodoByIdQuery(id ?? 0, { skip: id === null })
  const todo = todoQuery.data
  const userQuery = useGetUserByIdQuery(todo?.userId ?? 0, { skip: !todo })

  if (id === null || isNotFoundError(todoQuery.error)) {
    return <NotFound message="Задача не найдена" />
  }
  if (todoQuery.isLoading) return <LoadingIndicator label="Загрузка задачи…" />
  if (todoQuery.isError || !todo) {
    return (
      <ErrorMessage
        message="Не удалось загрузить задачу"
        onRetry={todoQuery.refetch}
      />
    )
  }

  return (
    <article>
      <Link to="/">← К списку</Link>
      <h1>{todo.title}</h1>
      <p>
        Статус: <strong>{todo.completed ? 'Выполнена' : 'Не выполнена'}</strong>
      </p>
      <section aria-label="Владелец">
        <h2>Владелец</h2>
        {userQuery.isLoading && <LoadingIndicator label="Загрузка пользователя…" />}
        {userQuery.isError && (
          <ErrorMessage
            message="Не удалось загрузить пользователя"
            onRetry={userQuery.refetch}
          />
        )}
        {userQuery.data && (
          <p>
            {userQuery.data.name} ({userQuery.data.email})
          </p>
        )}
      </section>
    </article>
  )
}

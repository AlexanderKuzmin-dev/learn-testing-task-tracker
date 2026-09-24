import { ErrorMessage } from '../../../components/ErrorMessage'
import { LoadingIndicator } from '../../../components/LoadingIndicator'
import { useGetTodosQuery } from '../todosApi'
import { TodosContent } from './TodosContent'

// Отвечает только за состояния запроса: loading / error (с retry) / success.
export function TodosSection() {
  const { data, isLoading, isError, refetch } = useGetTodosQuery()

  if (isLoading) return <LoadingIndicator label="Загрузка задач…" />
  if (isError || !data) {
    return <ErrorMessage message="Не удалось загрузить задачи" onRetry={refetch} />
  }

  return <TodosContent todos={data} />
}

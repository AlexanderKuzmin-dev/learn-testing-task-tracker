import { useGetUsersQuery } from '../../users/usersApi'
import { useAddTodoMutation } from '../todosApi'
import { TodoForm } from './TodoForm'

export function AddTodo() {
  const { data: users } = useGetUsersQuery()
  const [addTodo] = useAddTodoMutation()

  return (
    <section aria-label="Новая задача">
      <h2>Новая задача</h2>
      <TodoForm
        users={users}
        submitLabel="Добавить"
        resetOnSuccess
        onSubmit={async ({ title, userId }) => {
          await addTodo({ title, userId, completed: false }).unwrap()
        }}
      />
    </section>
  )
}

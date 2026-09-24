import { baseApi } from '../../app/baseApi'
import type { NewTodo, Todo, TodoChanges } from './types'
import {
  addTodoToList,
  getNextTodoId,
  isServerTodoId,
  removeTodoFromList,
  updateTodoInList,
} from './utils/todoList'

export interface UpdateTodoArg {
  id: number
  changes: TodoChanges
}

// JSONPlaceholder не сохраняет изменения, поэтому правки живут в кэше RTK Query.
// keepUnusedDataFor: Infinity — чтобы кэш не сбрасывался при уходе со страницы.
export const todosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos',
      keepUnusedDataFor: Infinity,
    }),

    getTodoById: builder.query<Todo, number>({
      query: (id) => `/todos/${id}`,
      keepUnusedDataFor: Infinity,
    }),

    addTodo: builder.mutation<Todo, NewTodo>({
      query: (body) => ({ url: '/todos', method: 'POST', body }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        await queryFulfilled

        // Сервер всегда отвечает id: 201, поэтому настоящий id назначаем сами.
        let created: Todo | undefined
        dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            created = { ...body, id: getNextTodoId(draft) }
            return addTodoToList(draft, created)
          }),
        )
        if (created) {
          void dispatch(
            todosApi.util.upsertQueryData('getTodoById', created.id, created),
          )
        }
      },
    }),

    updateTodo: builder.mutation<TodoChanges, UpdateTodoArg>({
      async queryFn({ id, changes }, _api, _extraOptions, baseQuery) {
        // Клиентские задачи на сервере не существуют — сеть не трогаем.
        if (!isServerTodoId(id)) return { data: changes }

        const result = await baseQuery({
          url: `/todos/${id}`,
          method: 'PATCH',
          body: changes,
        })
        return result.error
          ? { error: result.error }
          : { data: result.data as TodoChanges }
      },
      async onQueryStarted({ id, changes }, { dispatch, queryFulfilled }) {
        const patches = [
          dispatch(
            todosApi.util.updateQueryData('getTodos', undefined, (draft) =>
              updateTodoInList(draft, id, changes),
            ),
          ),
          dispatch(
            todosApi.util.updateQueryData('getTodoById', id, (draft) => ({
              ...draft,
              ...changes,
            })),
          ),
        ]
        try {
          await queryFulfilled
        } catch {
          patches.forEach((patch) => patch.undo())
        }
      },
    }),

    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({ url: `/todos/${id}`, method: 'DELETE' }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) =>
            removeTodoFromList(draft, id),
          ),
        )
        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },
    }),
  }),
})

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi

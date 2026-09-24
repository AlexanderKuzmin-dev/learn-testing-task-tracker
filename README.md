# Task Tracker

Учебный проект: кодовая база для последующего покрытия тестами.
Стек: React, TypeScript (strict), Redux Toolkit + RTK Query, react-router-dom, Vite.
API: https://jsonplaceholder.typicode.com (`/todos`, `/users`).

```bash
npm install
npm run dev     # dev-сервер
npm run build   # tsc + сборка
npm run lint
```

Вход фейковый: подойдёт любой email в корректном формате и любой непустой пароль.

## Структура

```
src/
  app/                 store (setupStore), baseApi, типизированные хуки, routes, layout
  components/          Button, Input, Select, Modal, ConfirmDialog, ErrorMessage, ...
  utils/               isNotFoundError, useDebouncedValue
  features/
    todos/
      utils/           чистые функции: filterTodos, paginate, calculateStats,
                       validateTodoTitle, todoList, parseTodoId
      todosApi.ts      RTK Query: endpoints + оптимистичные обновления кэша
      todoFiltersSlice.ts  фильтры и пагинация + selectors
      hooks/ components/ pages/
    users/             usersApi
    auth/              authSlice, persist в localStorage, ProtectedRoute, LoginPage
```

## Заметки

- JSONPlaceholder не сохраняет изменения: правки живут в кэше RTK Query
  (`updateQueryData`), поэтому держатся до перезагрузки страницы.
- Созданные задачи получают клиентский id (> 200); для них PATCH в сеть не уходит.
- `setupStore(preloadedState)` и `routes` вынесены как фабрика/массив, чтобы их
  можно было собирать в тестах (`createMemoryRouter(routes)`).

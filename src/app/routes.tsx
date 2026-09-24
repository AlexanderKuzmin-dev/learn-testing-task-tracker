import type { RouteObject } from 'react-router-dom'
import { NotFound } from '../components/NotFound'
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { TodoDetailPage } from '../features/todos/pages/TodoDetailPage'
import { TodosPage } from '../features/todos/pages/TodosPage'
import { AppLayout } from './AppLayout'

// Массив, а не готовый роутер: тесты соберут createMemoryRouter(routes).
export const routes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <TodosPage /> },
          { path: 'todos/:id', element: <TodoDetailPage /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
]

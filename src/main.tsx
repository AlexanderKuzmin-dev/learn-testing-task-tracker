import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './app/routes'
import { setupStore } from './app/store'
import { loadAuthState } from './features/auth/authStorage'
import './index.css'

const store = setupStore({ auth: loadAuthState() })
const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

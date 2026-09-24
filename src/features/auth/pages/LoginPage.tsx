import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { LoginForm } from '../components/LoginForm'
import { login, selectIsAuthenticated } from '../authSlice'

interface LocationState {
  from?: { pathname: string }
}

export function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  // Куда вернуть пользователя после входа (его перекинул ProtectedRoute).
  const redirectTo = (location.state as LocationState | null)?.from?.pathname ?? '/'

  if (isAuthenticated) return <Navigate to={redirectTo} replace />

  return (
    <main className="login">
      <h1>Вход</h1>
      <LoginForm
        onSubmit={({ email }) => {
          dispatch(login({ email }))
          navigate(redirectTo, { replace: true })
        }}
      />
    </main>
  )
}

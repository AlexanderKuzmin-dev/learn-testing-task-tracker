import { Link, Outlet } from 'react-router-dom'
import { Button } from '../components/Button'
import { logout, selectAuthEmail } from '../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from './hooks'

export function AppLayout() {
  const dispatch = useAppDispatch()
  const email = useAppSelector(selectAuthEmail)

  return (
    <>
      <header className="app-header">
        <Link to="/">Task Tracker</Link>
        <span className="spacer" />
        <span>{email}</span>
        <Button onClick={() => dispatch(logout())}>Выйти</Button>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </>
  )
}

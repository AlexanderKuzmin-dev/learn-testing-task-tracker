import { Link } from 'react-router-dom'

interface NotFoundProps {
  message?: string
}

export function NotFound({ message = 'Страница не найдена' }: NotFoundProps) {
  return (
    <section>
      <h1>404</h1>
      <p>{message}</p>
      <Link to="/">К списку задач</Link>
    </section>
  )
}

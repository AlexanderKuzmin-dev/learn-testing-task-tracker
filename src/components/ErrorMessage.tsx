import { Button } from './Button'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div role="alert" className="error-box">
      <p>{message}</p>
      {onRetry && <Button onClick={onRetry}>Повторить</Button>}
    </div>
  )
}

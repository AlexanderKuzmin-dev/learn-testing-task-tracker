interface LoadingIndicatorProps {
  label?: string
}

export function LoadingIndicator({ label = 'Загрузка…' }: LoadingIndicatorProps) {
  return <p role="status">{label}</p>
}

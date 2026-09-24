import { Button } from './Button'
import { Modal } from './Modal'

interface ConfirmDialogProps {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  isLoading?: boolean
  error?: string | null
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Подтвердить',
  cancelLabel = 'Отмена',
  isLoading = false,
  error,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p>{message}</p>
      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}
      <div className="modal-actions">
        <Button onClick={onCancel}>{cancelLabel}</Button>
        <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { Select } from '../../../components/Select'
import type { User } from '../../users/types'
import { validateTodoTitle } from '../utils/validateTodoTitle'

export interface TodoFormValues {
  title: string
  userId: number
}

interface TodoFormProps {
  initialValues?: TodoFormValues
  // Если переданы пользователи — показываем выбор владельца.
  users?: User[]
  submitLabel: string
  resetOnSuccess?: boolean
  onSubmit: (values: TodoFormValues) => Promise<void> | void
  onCancel?: () => void
}

const DEFAULT_VALUES: TodoFormValues = { title: '', userId: 1 }

export function TodoForm({
  initialValues = DEFAULT_VALUES,
  users,
  submitLabel,
  resetOnSuccess = false,
  onSubmit,
  onCancel,
}: TodoFormProps) {
  const [title, setTitle] = useState(initialValues.title)
  const [userId, setUserId] = useState(initialValues.userId)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const error = validateTodoTitle(title)
    setValidationError(error)
    if (error) return

    setSubmitError(null)
    setIsSubmitting(true)
    try {
      await onSubmit({ title: title.trim(), userId })
      if (resetOnSuccess) setTitle('')
    } catch {
      setSubmitError('Не удалось сохранить задачу')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="todo-form">
      <Input
        label="Название"
        value={title}
        error={validationError}
        onChange={(event) => {
          setTitle(event.target.value)
          setValidationError(null)
        }}
      />
      {users && users.length > 0 && (
        <Select
          label="Владелец"
          value={String(userId)}
          options={users.map((user) => ({
            value: String(user.id),
            label: user.name,
          }))}
          onChange={(event) => setUserId(Number(event.target.value))}
        />
      )}
      {submitError && (
        <p role="alert" className="field-error">
          {submitError}
        </p>
      )}
      <div className="form-actions">
        {onCancel && <Button onClick={onCancel}>Отмена</Button>}
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

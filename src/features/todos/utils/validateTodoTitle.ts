import { TITLE_MIN_LENGTH } from '../constants'

// Возвращает текст ошибки или null, если название валидно.
export function validateTodoTitle(title: string): string | null {
  const trimmed = title.trim()
  if (trimmed.length === 0) return 'Название обязательно'
  if (trimmed.length < TITLE_MIN_LENGTH) {
    return `Минимум ${TITLE_MIN_LENGTH} символа`
  }
  return null
}

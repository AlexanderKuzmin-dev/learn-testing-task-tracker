const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Оба валидатора возвращают текст ошибки или null.
export function validateEmail(email: string): string | null {
  const trimmed = email.trim()
  if (trimmed.length === 0) return 'Email обязателен'
  if (!EMAIL_PATTERN.test(trimmed)) return 'Некорректный формат email'
  return null
}

export function validatePassword(password: string): string | null {
  return password.length === 0 ? 'Пароль обязателен' : null
}

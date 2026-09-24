import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { validateEmail, validatePassword } from '../utils/validateCredentials'

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextEmailError = validateEmail(email)
    const nextPasswordError = validatePassword(password)
    setEmailError(nextEmailError)
    setPasswordError(nextPasswordError)
    if (nextEmailError || nextPasswordError) return

    onSubmit({ email: email.trim(), password })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        error={emailError}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        label="Пароль"
        type="password"
        autoComplete="current-password"
        value={password}
        error={passwordError}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit" variant="primary">
        Войти
      </Button>
    </form>
  )
}

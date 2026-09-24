import { initialAuthState } from './authSlice'
import type { AuthState } from './authSlice'

export const AUTH_STORAGE_KEY = 'task-tracker:auth'

function isAuthState(value: unknown): value is AuthState {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    candidate.isAuthenticated === true &&
    typeof candidate.email === 'string'
  )
}

// Битые или чужие данные в localStorage считаем «не залогинен».
export function loadAuthState(storage: Storage = localStorage): AuthState {
  try {
    const raw = storage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return initialAuthState
    const parsed: unknown = JSON.parse(raw)
    return isAuthState(parsed) ? parsed : initialAuthState
  } catch {
    return initialAuthState
  }
}

export function saveAuthState(
  state: AuthState,
  storage: Storage = localStorage,
): void {
  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state))
}

export function clearAuthState(storage: Storage = localStorage): void {
  storage.removeItem(AUTH_STORAGE_KEY)
}

import { createListenerMiddleware } from '@reduxjs/toolkit'
import { login, logout } from './authSlice'
import { clearAuthState, saveAuthState } from './authStorage'

export function createAuthPersistenceMiddleware() {
  const listener = createListenerMiddleware()

  listener.startListening({
    actionCreator: login,
    effect: (action) =>
      saveAuthState({ isAuthenticated: true, email: action.payload.email }),
  })
  listener.startListening({
    actionCreator: logout,
    effect: () => clearAuthState(),
  })

  return listener
}

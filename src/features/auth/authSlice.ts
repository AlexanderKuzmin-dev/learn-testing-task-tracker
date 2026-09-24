import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export interface AuthState {
  isAuthenticated: boolean
  email: string | null
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  email: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action: PayloadAction<{ email: string }>) {
      state.isAuthenticated = true
      state.email = action.payload.email
    },
    logout() {
      return initialAuthState
    },
  },
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
export const selectAuthEmail = (state: RootState) => state.auth.email

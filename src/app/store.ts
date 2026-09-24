import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { baseApi } from './baseApi'
import { authReducer } from '../features/auth/authSlice'
import { createAuthPersistenceMiddleware } from '../features/auth/authPersistence'
import { todoFiltersReducer } from '../features/todos/todoFiltersSlice'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  todoFilters: todoFiltersReducer,
})

export type RootState = ReturnType<typeof rootReducer>

// Фабрика, а не синглтон: в тестах каждому кейсу нужен свой чистый стор.
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(createAuthPersistenceMiddleware().middleware)
        .concat(baseApi.middleware),
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

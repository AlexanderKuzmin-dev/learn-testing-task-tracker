import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { PAGE_SIZE } from './constants'
import type { StatusFilter, TodoFilters } from './types'

export interface TodoFiltersState extends TodoFilters {
  visibleCount: number
}

export const initialTodoFiltersState: TodoFiltersState = {
  status: 'all',
  userId: null,
  search: '',
  visibleCount: PAGE_SIZE,
}

// Любое изменение фильтра возвращает пагинацию на первую страницу.
const todoFiltersSlice = createSlice({
  name: 'todoFilters',
  initialState: initialTodoFiltersState,
  reducers: {
    setStatus(state, action: PayloadAction<StatusFilter>) {
      if (state.status === action.payload) return
      state.status = action.payload
      state.visibleCount = PAGE_SIZE
    },
    setUserId(state, action: PayloadAction<number | null>) {
      if (state.userId === action.payload) return
      state.userId = action.payload
      state.visibleCount = PAGE_SIZE
    },
    setSearch(state, action: PayloadAction<string>) {
      if (state.search === action.payload) return
      state.search = action.payload
      state.visibleCount = PAGE_SIZE
    },
    showMore(state) {
      state.visibleCount += PAGE_SIZE
    },
    resetFilters() {
      return initialTodoFiltersState
    },
  },
})

export const { setStatus, setUserId, setSearch, showMore, resetFilters } =
  todoFiltersSlice.actions
export const todoFiltersReducer = todoFiltersSlice.reducer

const selectStatus = (state: RootState) => state.todoFilters.status
const selectUserId = (state: RootState) => state.todoFilters.userId
const selectSearch = (state: RootState) => state.todoFilters.search

export const selectVisibleCount = (state: RootState) =>
  state.todoFilters.visibleCount

export const selectTodoFilters = createSelector(
  [selectStatus, selectUserId, selectSearch],
  (status, userId, search): TodoFilters => ({ status, userId, search }),
)

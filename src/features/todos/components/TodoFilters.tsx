import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Input } from '../../../components/Input'
import { Select } from '../../../components/Select'
import { useDebouncedValue } from '../../../utils/useDebouncedValue'
import { useGetUsersQuery } from '../../users/usersApi'
import { SEARCH_DEBOUNCE_MS } from '../constants'
import { selectTodoFilters, setSearch, setStatus, setUserId } from '../todoFiltersSlice'
import type { StatusFilter } from '../types'

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'completed', label: 'Выполненные' },
  { value: 'active', label: 'Невыполненные' },
]

export function TodoFilters() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectTodoFilters)
  const { data: users = [] } = useGetUsersQuery()

  // Поле ввода — локальное, в стор попадает уже отдебаунсенное значение.
  const [searchInput, setSearchInput] = useState(filters.search)
  const debouncedSearch = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_MS)

  useEffect(() => {
    dispatch(setSearch(debouncedSearch))
  }, [debouncedSearch, dispatch])

  return (
    <section aria-label="Фильтры" className="filters">
      <Input
        label="Поиск"
        type="search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <Select
        label="Статус"
        value={filters.status}
        options={STATUS_OPTIONS}
        onChange={(event) => dispatch(setStatus(event.target.value as StatusFilter))}
      />
      <Select
        label="Пользователь"
        value={filters.userId === null ? '' : String(filters.userId)}
        options={[
          { value: '', label: 'Все' },
          ...users.map((user) => ({ value: String(user.id), label: user.name })),
        ]}
        onChange={(event) =>
          dispatch(
            setUserId(event.target.value === '' ? null : Number(event.target.value)),
          )
        }
      />
    </section>
  )
}

import { AddTodo } from '../components/AddTodo'
import { TodoFilters } from '../components/TodoFilters'
import { TodoStats } from '../components/TodoStats'
import { TodosSection } from '../components/TodosSection'

export function TodosPage() {
  return (
    <div>
      <h1>Задачи</h1>
      <TodoStats />
      <AddTodo />
      <TodoFilters />
      <TodosSection />
    </div>
  )
}

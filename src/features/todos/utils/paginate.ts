// «Показать ещё»: первые visibleCount элементов.
export function paginate<T>(items: T[], visibleCount: number): T[] {
  return items.slice(0, Math.max(0, visibleCount))
}

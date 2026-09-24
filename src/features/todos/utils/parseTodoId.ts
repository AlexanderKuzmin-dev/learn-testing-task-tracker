// Разбирает :id из URL; всё, что не положительное целое, — null.
export function parseTodoId(param: string | undefined): number | null {
  if (param === undefined || !/^\d+$/.test(param)) return null
  const id = Number(param)
  return Number.isSafeInteger(id) && id > 0 ? id : null
}

// Ошибки fetchBaseQuery имеют вид { status: number | 'FETCH_ERROR' | ... }.
export function isNotFoundError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    error.status === 404
  )
}

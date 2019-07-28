export const getQueryParam = (id: string): string | null => {
  const location = window.location.href.replace('/#/', '').replace('#/', '')
  const url = new URL(location)
  return url.searchParams.get(id)
}

const localStorage = window.localStorage

export const getToken = (): string => {
  return localStorage.getItem('token') || ''
}

export const saveToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

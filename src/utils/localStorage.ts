const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY'

const setAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken || '')
}

const getAccessToken = (): string => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || ''
}

export default {
  setAccessToken,
  getAccessToken
}

export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'lane-vantage-theme'

export const resolveInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  return savedTheme === 'dark' ? 'dark' : 'light'
}

export const setTheme = (theme: Theme): void => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}

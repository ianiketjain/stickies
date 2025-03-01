export type LocalStorageInterface = { [key in 'NOTES' | 'THEME']: string }

const localStorageData: LocalStorageInterface = {
  NOTES: 'notes',
  THEME: 'theme',
}

const getLocalStorageData = (key: string) => {
  if (window && typeof window != undefined) {
    return localStorage.getItem(key)?.toString() ?? null
  } else {
    return null
  }
}

const setLocalStorageData = (key: string, value: string) => {
  if (window && typeof window != undefined) {
    localStorage.setItem(key, value)
    window.dispatchEvent(new Event('storage'))
  }
}

const removeLocalStorageData = (key: string) => {
  if (window && typeof window != undefined) {
    localStorage.removeItem(key)
  }
}

const clearLocalStorageData = () => {
  if (window && typeof window != undefined) {
    localStorage.clear()
  }
}

export { localStorageData, getLocalStorageData, setLocalStorageData, removeLocalStorageData, clearLocalStorageData }

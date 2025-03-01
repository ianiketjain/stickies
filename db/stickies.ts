import { getLocalStorageData, localStorageData, setLocalStorageData } from './storage'

export const setDataToLocalStorage = (data: any) => {
  let notes = JSON.stringify(data)
  setLocalStorageData(localStorageData.NOTES, notes)
}

export const getDataFromLocalStorage = () => {
  const notesData = getLocalStorageData(localStorageData.NOTES)
  return notesData ? JSON.parse(notesData) : []
}

export const setThemeToLocalStorage = (theme: any) => {
  let currTheme = JSON.stringify(theme)
  setLocalStorageData(localStorageData.THEME, currTheme)
}

export const getThemeFromLocalStorage = () => {
  const themeData = getLocalStorageData(localStorageData.THEME)
  return themeData ? JSON.parse(themeData) : { color: 'brown', id: '#795548' }
}

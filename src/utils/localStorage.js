import Storage from 'web-storage-cache'

const localStorage = new Storage()
// localStorage进行操作
export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage(key) {
  return localStorage.get(key)
}
export function removeLocalStorage(key) {
  return localStorage.delete(key)
}
export function clearLocalStorage() {
  return localStorage.clear()
}
export function setBookObject(filename, key, value) {
  let book = getLocalStorage(`${filename}-info`)
  if (!book) {
   book = {}
  }
  book[key] = value
  setLocalStorage(`${filename}-info`, book)
}
export function getBookObject(filename, key) {
  let book = getLocalStorage(`${filename}-info`)
  if (book) {
    return book[key]
  } else {
    return null
  }
}
// 本地保存 主题
export function getTheme(fileName) {
  return getBookObject(fileName, 'theme')
}
export function saveTheme(fileName, theme) {
  return setBookObject(fileName, 'theme', theme)
}
// 本地保存 字体
export function getFontSize(filename){
  return getBookObject(filename, 'fontSize')
}

export function saveFonSize (filename, fontSize) {
  return setBookObject(filename, 'fontSize', fontSize)
}
// 本地保存 语言界面
export function getLocale(){
  return getLocalStorage('locale')
}
export function saveLocale(locale){
  return setLocalStorage('locale', locale)
}
export function saveLocation(fileName, location) {
  setBookObject(fileName, 'location', location)
}
export function getLocation(fileName) {
  return getBookObject(fileName, 'location')
}
export function saveReadTime(fileName, time) {
  setBookObject(fileName, 'time', time)
}

export function getReadTime(fileName) {
  return getBookObject(fileName, 'time')
}
export function getBookmark(fileName) {
  return getBookObject(fileName, 'bookmark')
}

export function saveBookmark(fileName, bookmark) {
  setBookObject(fileName, 'bookmark', bookmark)
}

export function saveBookShelf(shelf){
  return setLocalStorage('shelf', shelf)
}
export function getBookShelf(){
  return getLocalStorage('shelf')
}

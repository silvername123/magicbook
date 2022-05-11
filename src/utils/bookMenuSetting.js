import { getReadTime } from '@/utils/localStorage'

export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]
// 对css进行操作

// 主题列表
export function themeLists(vue) {
  return [
    {
      // lang/index查找
      // 日间
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          'color': '#4c5059',
          'background': '#ffffff'
        }
      }
    },
    {
      // 夜间
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          'color': '#cecece',
          'background': '#000000'
        }
      }
    }
  ]
}

// 动态添加css href路径
export function addCss(href) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', href)
    document.getElementsByTagName('head')[0].appendChild(link)
}

export function removeCss(href) {
  const links = document.getElementsByTagName('link')
  for (let i = links.length; i >= 0; i--){
    const link = links[i]
    if (link && link.getAttribute('href') && link.getAttribute('href') === href){
      link.parentNode.removeChild(link)
    }
  }
}

export function removeAllCss(){
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
}
export function getReadTimeAttribute(fileName) {
  const time = getReadTime(fileName)
  if (!time){
    return 0
  } else {
    return Math.ceil(time / 60)
  }
}
export function flatten(array){
  return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
}

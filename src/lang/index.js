import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import cn from './cn'
import { getLocale, saveLocale } from '@/utils/localStorage'

Vue.use(VueI18n)

const messages = {
  en, // 英文
  cn // 中文
}

let locale = getLocale()
if (!locale){
  locale = 'cn'
  saveLocale(locale)
}
// 设置默认语言界面
const i18n = new VueI18n({
  locale,
  messages
})

export default i18n

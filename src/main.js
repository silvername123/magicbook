import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/icon.css'
import './assets/styles/global.scss'
// import './mock'
import './lazy'
import './utils/boost'
import './utils/create-api'
import i18n from '@/lang'

// main.js 配置引用文件
Vue.config.productionTip = false

new Vue({
  router,
  store,
  // 引入插件 i18n
  i18n,
  render: h => h(App)
}).$mount('#app')

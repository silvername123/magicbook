import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 设置输出路径
      path: '/',
      redirect: '/store/home'
    },
    {
      path: '/ebook',
      component: () => import('./views/ebook/index'),
      children: [
        {
          path: ':fileName',
          component: () => import('./components/ebook/EbookReader')
        }
      ]
    },
    {
      path: '/store',
      component: () => import('./views/store/index'),
      redirect: ' ',
      children: [
        {
          path: 'home',
          component: () => import('./views/store/StoreHome')
        },
        {
          path: 'shelf',
          component: () => import('./views/store/StoreShelf')
        },
        {
          path: 'category',
          component: () => import('./views/store/StoreCategory')
        },
        {
          path: 'list',
          component: () => import('./views/store/StoreList')
        },
        {
          path: 'detail',
          component: () => import('./views/store/StoreDetail')
        }
      ]
    }
  ]
})

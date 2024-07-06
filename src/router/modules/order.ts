import { RouterView, RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/order',
  name: 'order',
  component: RouterView,
  meta: {
    title: '订单'
  },
  children: [
    {
      path: 'order_list',
      name: 'order_list',
      meta: {
        title: '订单列表'
      },
      component: () => import('@/views/order/list/index.vue')
    },
    {
      path: 'order_offline',
      name: 'order_offline',
      meta: {
        title: '在线订单'
      },
      component: () => import('@/views/order/offline/index.vue')
    }
  ]
}

export default route

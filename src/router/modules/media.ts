import { RouteRecordRaw } from 'vue-router'

const media: RouteRecordRaw = {
  path: '/media',
  name: 'media',
  meta: {
    title: '媒体'
  },
  component: () => import('@/views/media/index.vue')
} as RouteRecordRaw

export default media

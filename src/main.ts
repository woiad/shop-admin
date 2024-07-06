import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import ElementPlus from './plugins/element-plus'
import ElementPlusIcon from './plugins/element-icon'

// 加载全局样式
import './styles/index.scss'

createApp(App)
  .use(router)
  .use(store, key)
  .use(ElementPlus)
  .use(ElementPlusIcon)
  .mount('#app')

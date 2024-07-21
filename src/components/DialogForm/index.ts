import { App } from '@vue/runtime-core'
import Component from './index.vue'

export default {
  install (app: App) {
    app.component('AppDialogForm', Component)
  }
}

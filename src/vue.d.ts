/* eslint-disable no-unused-vars */
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { State } from './store/index.ts'

declare module '@vue/runtime-core' {

  // 为 this.$state 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

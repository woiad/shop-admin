import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'

export interface State {
  count: number,
  isCollapse: boolean
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建 store 实例
export const store = createStore<State>({
  state () {
    return {
      count: 0,
      isCollapse: false
    }
  },

  mutations: {
    increment (state) {
      state.count++
    },
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    }
  }
})

// 定义自己的 useStore 组合函数
export function useStore () {
  return baseUseStore(key)
}

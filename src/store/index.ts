import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import type { IUserInfo } from '@/api/types/common'
import { getItem, setItem } from '@/utils/storage'
import { USER } from '@/utils/constants'

const state = {
  count: 1,
  isCollapse: false,
  user: getItem< { token: string } & IUserInfo>(USER)
}

export type State = typeof state

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建 store 实例
export const store = createStore<State>({
  state,

  mutations: {
    increment (state) {
      state.count++
    },
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    },
    setUser (state, payload) {
      state.user = payload
      setItem(USER, JSON.stringify(state.user))
    }
  }
})

// 定义自己的 useStore 组合函数
export function useStore () {
  return baseUseStore(key)
}

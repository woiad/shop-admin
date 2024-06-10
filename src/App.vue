<!--
1. lang = ts
2. 为了让 TypeScript 正确地推导出组件选项内的类型，我们需要通过 defineComponent() 这个全局 API 来定义组件：
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const helloWorld = ref<InstanceType<typeof HelloWorld> | null>(null)
onMounted(() => {
  console.log(helloWorld.value)
})
</script>

<template>
  <!-- <div>
    <a
      href="https://vitejs.dev"
      target="_blank"
    >
      <img
        src="/vite.svg"
        class="logo"
        alt="Vite logo"
      >
    </a>
    <a
      href="https://vuejs.org/"
      target="_blank"
    >
      <img
        src="./assets/vue.svg"
        class="logo vue"
        alt="Vue logo"
      >
    </a>
  </div> -->
  <router-view />
  <HelloWorld
    ref="helloWorld"
    msg="Vite + Vue"
  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

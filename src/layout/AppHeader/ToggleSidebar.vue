<template>
  <div class="toggle-container">
    <el-icon
      v-if="!isCollapse"
      @click="handleCollapes"
    >
      <Fold />
    </el-icon>
    <el-icon
      v-if="isCollapse"
      @click="handleCollapes"
    >
      <Expand />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/index'
import { computed } from 'vue'
const store = useStore()

const isCollapse = computed(() => {
  return store.state.isCollapse
})

const handleCollapes = () => {
  store.commit('setIsCollapse', !store.state.isCollapse)
}

</script>

<style lang="scss">
.toggle-container{
  display: inline-block;
  height: 19px;
  i {
    font-size: 19px;
    cursor: pointer;
  }
}
</style>

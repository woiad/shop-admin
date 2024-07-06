<template>
  <el-autocomplete
    v-model="value"
    class="inline-input"
    prefix-icon="el-icon-search"
    placeholder="请输入内容"
    value-key="menu_name"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()
</script>

<style lang="scss" scoped>
.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.menu-link, .link-text {
  display: block;
}
</style>

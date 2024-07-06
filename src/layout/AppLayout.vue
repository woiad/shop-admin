<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <app-menu />
      </el-aside>
      <el-container>
        <el-header>
          <app-header />
        </el-header>
        <el-main>
          <!--- 子路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import AppMenu from './AppMenu/index.vue'
import AppHeader from './AppHeader/index.vue'
</script>
<style lang="scss">
  .el-container{
    height: 100vh;

    .el-header {
      background-color: #fff;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .el-aside {
      width: auto;
      background: #304156;
    }

    .el-main {
      background-color: #E9EEF3;
      color: #333;
    }
  }
</style>

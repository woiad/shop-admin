<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ $store.state.user?.account }}
      <el-icon><ArrowDown /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { logout } from '@/api/common'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const store = useStore()
const router = useRouter()
const handleLogout = () => {
  ElMessageBox.confirm('确认退出登录?').then(async () => {
    await logout()

    ElMessage.success('退出登录成功')

    store.commit('setUser', null)

    router.push({
      name: 'login'
    })
  }).catch(() => {
    ElMessage.info('取消退出登录')
  })
}
</script>

<style lang="scss" scoped></style>

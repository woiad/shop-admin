<template>
  <el-dialog
    ref="dialog"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
          :loading="confirmLoading"
        >
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { IElDialog } from '../../types/element-plus'
import { ref, PropType } from 'vue'

const props = defineProps({
  confirm: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  }
})

const dialog = ref<IElDialog | null>(null)
const handleCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false
  }
}

const confirmLoading = ref(false)
const handleConfirm = async () => {
  confirmLoading.value = true
  await props.confirm().catch(() => {
    confirmLoading.value = false
  })
  confirmLoading.value = false
}
</script>

<style type="scss"></style>

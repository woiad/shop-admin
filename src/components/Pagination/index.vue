<template>
  <el-pagination
    :current-page="props.page"
    :page-size="props.limit"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="listCount"
    :page-sizes="[10, 20, 30, 40, 50, 100]"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script lang="ts" setup>
import type { PropType } from '@vue/runtime-core'

const props = defineProps({
  page: { // 页码
    type: Number,
    default: 1
  },
  limit: { // 每页大小
    type: Number,
    default: 10
  },
  listCount: {
    type: Number,
    default: 0
  },
  loadList: {
    type: Function as PropType<(...args: any[]) => void>,
    default: () => {}
  }
})

// interface PropType {
//   page: number,
//   limit: number,
//   listCount: number,
//   loadList: () => void
// }

// const props = defineProps<PropType>()

// 通过 ts 设置 props 数据，并添加默认值
// const props = withDefaults(defineProps<PropType>(), {
//   page: 1,
//   limit: 10,
//   listCount: 0
// })

interface EmitsType {
  (e: 'update:page', page: number): void
  (e: 'update:limit', limit: number): void
}

const emit = defineEmits<EmitsType>()

const handleCurrentChange = (page: number) => {
  emit('update:page', page)
  props.loadList()
}

const handleSizeChange = (size: number) => {
  emit('update:page', 1)
  emit('update:limit', size)
  props.loadList()
}
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>

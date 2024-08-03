<template>
  <div ref="draggableContainer">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import Sortable from 'sortablejs'
import { onMounted, ref, PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  // options 配置参考 https://github.com/SortableJS/Sortable?tab=readme-ov-file#options
  options: {
    type: Object as PropType<Sortable.Options>,
    default: () => {}
  }
})
interface EmitsType {
  (e: 'update:model-value', value: any[]): void
}
const emit = defineEmits<EmitsType>()

const draggableContainer = ref<HTMLDivElement | null>(null)
const initDraggable = () => {
  if (!draggableContainer.value) {
    console.error('容器不能为空')
    return
  }
  // eslint-disable-next-line no-unused-vars
  const sortable = Sortable.create(draggableContainer.value, {
    animation: 300,
    onUpdate (e) {
      if (e.oldIndex !== undefined && e.newIndex !== undefined) {
        // 删除拖住元素
        const list = props.modelValue.slice(0)
        const item = list.splice(e.oldIndex, 1)[0]
        // 把删除的元素放到新的位置
        list.splice(e.newIndex, 0, item)
        emit('update:model-value', list)
      }
    },
    ...props.options
  })
}

onMounted(() => {
  initDraggable()
})

</script>
<style lang="scss" scoped>
:deep(.el-tag) {
  margin-right: 5px;
}
</style>

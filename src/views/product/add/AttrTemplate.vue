<template>
  <el-form inline>
    <el-form-item>
      <el-select
        v-model="value"
        placeholder="请选择规格模板"
      >
        <el-option
          v-for="item in list"
          :key="item.id"
          :label="item.rule_name"
          :value="item.id"
          value-key="id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleConfirm"
      >
        确定
      </el-button>
      <el-button type="primary">
        添加规格模板
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getAttrs } from '@/api/product'
import { onMounted } from '@vue/runtime-core'
import type { ProductAttrTpl, AttrRuleValue } from '@/api/types/product'

const list = ref<ProductAttrTpl[]>([])
const value = ref<number | null>(null)

interface EmitsType{
  (e: 'confirm', value: AttrRuleValue): void
}
const emit = defineEmits<EmitsType>()

onMounted(() => {
  loadList()
})

const loadList = async () => {
  list.value = await getAttrs()
}

const handleConfirm = () => {
  if (value.value) {
    const item = list.value.find(item => item.id === value.value)
    if (item) {
      emit('confirm', item.rule_value)
    }
  }
}
</script>

<style lang="scss" scoped></style>

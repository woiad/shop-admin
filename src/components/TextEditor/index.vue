<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="valueHtml"
      :default-config="editorConfig"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IDomEditor, IEditorConfig } from '@wangeditor/editor'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

interface EmitsType {
  (e:'update:model-value', val: string): void
}

const emit = defineEmits<EmitsType>()

const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig: Partial<IEditorConfig> = { placeholder: '请输入内容...' }

watch(() => props.modelValue, () => {
  valueHtml.value = props.modelValue
})
// 内容 HTML
const valueHtml = ref(props.modelValue)

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const handleChange = (editor: IDomEditor) => { // TS 语法
  emit('update:model-value', valueHtml.value)
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style lang="scss"></style>

<template>
  <el-form
    label-position="left"
    label-width="40px"
    class="attr-form"
  >
    <app-draggable
      v-model="data"
      :options="{
        handle: '.el-form-item__label'
      }"
    >
      <el-form-item
        v-for="(item, index) in data"
        :key="item.value + index"
        class="attr-list"
      >
        <template #label>
          <el-icon><Menu /></el-icon>
        </template>
        <div>
          <el-tag
            effect="dark"
            closable
            @close="data.splice(index, 1)"
          >
            {{ item.value }}
          </el-tag>
        </div>
        <div>
          <app-draggable
            style="display: inline-block;"
            v-model="item.detail"
          >
            <el-tag
              v-for="(detail, detailIndex) in item.detail"
              :key="detail"
              effect="plain"
              closable
              @close="item.detail.splice(detailIndex, 1)"
            >
              {{ detail }}
            </el-tag>
          </app-draggable>
          <el-input
            v-if="item.inputVisible"
            ref="saveTageInput"
            v-model="item.inputValue"
            class="w-20"
            size="small"
            @keyup.enter="handleInputConfirm(item)"
            @blur="handleInputConfirm(item)"
          />
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(item)"
          >
            + New Tag
          </el-button>
        </div>
      </el-form-item>
    </app-draggable>

    <el-form-item v-if="!isAdd">
      <el-button
        type="primary"
        @click="isAdd = true"
      >
        添加新规格
      </el-button>
      <el-button
        type="success"
        :loading="btnLoading"
        @click="handleGenerate"
      >
        立即生成
      </el-button>
    </el-form-item>
    <el-form-item v-else>
      <el-form
        :model="attrForm"
        :rules="formRules"
        ref="form"
        inline
      >
        <el-form-item
          label="规格名称"
          prop="value"
        >
          <el-input v-model="attrForm.value" />
        </el-form-item>
        <el-form-item
          label="规格值"
          prop="detail"
        >
          <el-input v-model="attrForm.detail" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleAddAttr"
          >
            确认
          </el-button>
          <el-button @click="isAdd = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { generateAttr } from '@/api/product'
import type { PropType } from 'vue'
import type { AttrRuleValue, AttrTableHeader, ProductAttr } from '@/api/types/product'
import type { IElForm, IElFormItemRule } from '@/types/element-plus'

const props = defineProps({
  modelValue: {
    type: Array as PropType<AttrRuleValue[]>,
    default: () => []
  }
})

type RuleValue = {
  inputValue: string,
  inputVisible: boolean
} & AttrRuleValue

interface EmitsType {
  (e: 'confirm', value: {
    attr: AttrRuleValue[]
    header: AttrTableHeader[]
    value: ProductAttr[]
  }): void,
  (e: 'update:model-value', value: RuleValue[]):void
}

const emit = defineEmits<EmitsType>()

const data = ref <RuleValue[]>([])

watch(() => props.modelValue, value => {
  const temp = JSON.parse(JSON.stringify(props.modelValue)) as AttrRuleValue[]
  data.value = temp.map(item => ({
    ...item,
    inputVisible: false,
    inputValue: ''
  }))
}, {
  deep: true,
  immediate: true
})

const btnLoading = ref(false)
const handleGenerate = async () => {
  btnLoading.value = true
  const resData = await generateAttr(0, 0, {
    attrs: data.value
  }).finally(() => {
    btnLoading.value = false
  })
  emit('confirm', resData.info)
  emit('update:model-value', data.value)
}
const saveTageInput = ref<HTMLInputElement[] | null>(null)
const showInput = async (item: RuleValue) => {
  item.inputVisible = true
  await nextTick()
  if (saveTageInput.value && saveTageInput.value.length) {
    saveTageInput.value[0]?.focus()
  }
}
const handleInputConfirm = (item: RuleValue) => {
  if (item.inputValue.length) {
    item.detail.push(item.inputValue)
  }
  item.inputVisible = false
  item.inputValue = ''
}

const isAdd = ref(false)
const attrForm = ref({
  value: '',
  detail: ''
})
const formRules: IElFormItemRule = {
  value: [
    { required: true, message: '请输入规则名称', trigger: 'blur' }
  ],
  detail: [
    { required: true, message: '请输入规则值', trigger: 'blur' }
  ]
}
const form = ref<IElForm | null>(null)
const handleAddAttr = async () => {
  const valid = await form.value?.validate()
  if (!valid) return
  data.value.push({
    value: attrForm.value.value,
    detail: [attrForm.value.detail],
    inputValue: '',
    inputVisible: false
  })
  isAdd.value = false
  form.value?.resetFields()
}
</script>
<style lang="scss">
.el-icon-menu {
  font-size: 20px;
  cursor: move;
}
.detail-item {
  margin-right: 10px;
}

.el-form-item {
  align-items: center;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.w-20 {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<style>
.el-form-item .attr-form .el-form-item{
  margin-bottom: 18px;
}
.attr-list .el-form-item__content {
  display: block;
}
.attr-list .el-form-item__content .el-tag{
  margin-right: 5px;
}
</style>

<template>
  <app-dialog-form
    :title="props.adminId ? '编辑角色' : '添加角色'"
    :confirm="handleSubmit"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item
        label="角色名称"
        prop="role_name"
      >
        <el-input
          v-model="formData.role_name"
          placeholder="请输入角色名称"
        />
      </el-form-item>

      <el-form-item label="状态">
        <el-radio-group v-model="formData.status">
          <el-radio
            :label="1"
          >
            开启
          </el-radio>
          <el-radio
            :label="0"
          >
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="角色权限"
        prop="account"
      >
        <el-tree
          ref="tree"
          style="max-height: 300px;width: 100%;overflow-y: scroll;"
          show-checkbox
          node-key="id"
          :data="menus"
          :props="{
            label: 'title'
          }"
        />
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>
<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { IElForm, IElFormItemRule, IElTree } from '@/types/element-plus'
import { IMenu } from '@/api/types/role'
import { getMenus, saveRole, getRole } from '@/api/role'
import { ElMessage } from 'element-plus'

const props = defineProps({
  roleId: {
    type: Number,
    default: 0
  }
})

interface EmitsType {
  (e: 'update:role-id', value: number | null),
  (e: 'success'): void
}

const emit = defineEmits<EmitsType>()

const formData = ref({
  role_name: '',
  status: 0 as 0 | 1,
  checked_menus: [] as number[]
})
const form = ref<IElForm | null>(null)
const formLoading = ref(false)
const tree = ref<IElTree | null>(null)

const formRules: IElFormItemRule = {
  role_name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ]
}
const menus = ref<IMenu []>([])

const loadMenus = async () => {
  const data = await getMenus()
  menus.value = data.menus
}

const loadRole = async () => {
  const { menus: menuData, role } = await getRole(props.roleId)
  menus.value = menuData
  formData.value.role_name = role.role_name
  formData.value.status = role.status
  await nextTick() // 确保树节点渲染完毕
  setMenuChecked(role.rules.split(',').map(id => Number.parseInt(id)))
}

const setMenuChecked = (menuIds: number[]) => {
  menuIds.forEach(id => {
    const node = tree.value.getNode(id)
    if (node && node.isLeaf) {
      tree.value.setChecked(id, true, false)
    }
  })
}

const handleDialogOpen = async () => {
  formLoading.value = true
  try {
    props.roleId
      ? await loadRole()
      : await loadMenus()
  } catch (err) {
    console.log(err)
  } finally {
    formLoading.value = false
  }
}
const handleDialogClosed = () => {
  emit('update:role-id', null)
  form.value?.clearValidate()
  form.value?.resetFields()
}

const handleSubmit = async () => {
  const valid = await form.value.validate()
  if (!valid) return

  formData.value.checked_menus = [
    ...tree.value?.getCheckedKeys(),
    ...tree.value?.getHalfCheckedKeys()
  ]

  await saveRole(props.roleId ? props.roleId : 0, formData.value)
  emit('success')
  ElMessage.success('保存成功')
}
</script>
<style lang="scss"></style>

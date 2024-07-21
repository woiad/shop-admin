<template>
  <page-container>
    <app-card>
      <template #header>
        数据筛选
      </template>
      <el-form
        :inline="true"
        ref="form"
        :model="listParams"
        :disabled="listLoading"
        @submit.prevent="handleQuery"
      >
        <el-form-item label="状态">
          <el-select
            v-model="listParams.status"
            placeholder="请选择"
            clearable
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              label="显示"
              :value="1"
            />
            <el-option
              label="不显示"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="请输入身份昵称">
          <el-input
            v-model="listParams.role_name"
            clearable
            placeholder="请输入身份昵称"
          />
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </app-card>
    <app-card>
      <template #header>
        <el-button
          type="primary"
          @click="formVisible = true"
        >
          添加角色
        </el-button>
      </template>
      <el-table
        :data="list"
        stripe
        style="width: 100%"
        v-loading="listLoading"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="80"
        />
        <el-table-column
          prop="role_name"
          label="身份昵称"
          width="180"
        />
        <el-table-column
          prop="rules"
          label="权限"
        >
          <template #default="scope">
            <div
              class="text-nowrap"
              :title="scope.row.rules"
            >
              {{ scope.row.rules }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              :active-value="1"
              :inactive-value="0"
              :loading="scope.row.statusLoading"
              @change="handleStatuChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="180"
          align="center"
        >
          <template #default="scope">
            <el-button
              type="text"
              @click="handleUpdate(scope.row.id)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除吗？"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="text">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <app-pagination
        :list-count="listCount"
        v-model:page="listParams.page"
        v-model:limit="listParams.limit"
        :load-list="loadList"
        :disabled="listLoading"
      />

      <role-form
        v-model="formVisible"
        v-model:role-id="roleId"
        @success="handleSuccess"
      />
    </app-card>
  </page-container>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { getRoles, updateRoleStatus, deleteRole } from '@/api/role'
import { ElMessage } from 'element-plus'
import RoleForm from './RoleForm.vue'

const list = ref([])
const listLoading = ref(false)
const listCount = ref(0)
const listParams = reactive({
  page: 1,
  limit: 10,
  status: '',
  role_name: ''
})

const loadList = async () => {
  listLoading.value = true
  const data = await getRoles(listParams).finally(() => {
    listLoading.value = false
  })
  listCount.value = data.count
  data.list.forEach(item => {
    item.statusLoading = false
  })
  list.value = data.list
}

onMounted(() => {
  loadList()
})

const handleQuery = () => {
  loadList()
}
const handleStatuChange = async (item) => {
  item.statusLoading = true
  await updateRoleStatus(item.id, item.status).finally(() => {
    item.statusLoading = false
  })
  ElMessage.success(`${item.status === 1 ? '启用' : '禁用'}成功`)
}
const handleUpdate = (id: number) => {
  formVisible.value = true
  roleId.value = id
}

const handleDelete = async (id: number) => {
  await deleteRole(id)
  loadList()
  ElMessage.success('删除成功')
}

const formVisible = ref(false)
const roleId = ref()
const handleSuccess = () => {
  formVisible.value = false
  loadList()
}
</script>
<style lang="scss" scoped>
.text-nowrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

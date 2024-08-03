<template>
  <page-container>
    <app-card>
      <template #header>
        数据筛选
      </template>
      <el-form
        ref="form"
        :model="listParams"
        :disabled="listLoading"
        @submit.prevent="handleQuery"
      >
        <el-form-item label="商品分类">
          <el-select
            v-model="listParams.cate_id"
            placeholder="请选择"
            clearable
            @change="loadList"
            style="width: 300px;"
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              v-for="item in productCates"
              :key="item.id"
              :label="`${item.html}${item.cate_name}`"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input
            v-model="listParams.store_name"
            clearable
            placeholder="请输入商品名称关键字"
            style="width: 300px;"
          >
            <template #append>
              <el-button
                :icon="Search"
                @click="loadList"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品类目">
          <el-radio-group
            v-model="listParams.type"
            @change="loadList"
          >
            <el-radio :label="0">
              全部
            </el-radio>
            <el-radio
              v-for="item in productTypes"
              :key="item.type"
              :label="item.type"
            >
              {{ `${item.name}(${item.count})` }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </app-card>
    <app-card>
      <template #header>
        <el-button
          type="primary"
          @click="$router.push('/product/add_product')"
          :icon="Plus"
        >
          添加商品
        </el-button>
        <el-button
          v-if="listParams.type === 2"
          @click="handleUpdateProductsShow"
          :loading="updateProductsShowLoading"
        >
          批量上架
        </el-button>
        <el-button
          v-else
          @click="handleUpdateProductsUnshow"
          :loading="updateProductsUnShowLoading"
        >
          批量下架
        </el-button>
        <el-button
          :icon="Document"
          :loading="exportExcelLoading"
          @click="handleExportExcel"
        >
          导出表格
        </el-button>
      </template>
      <el-table
        :data="list"
        stripe
        style="width: 100%"
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
      >
        <el-table-column type="expand">
          <template #default="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="商品分类">
                <span>{{ props.row.cate_name }}</span>
              </el-form-item>
              <el-form-item label="市场价格">
                <span>{{ props.row.ot_price }}</span>
              </el-form-item>
              <el-form-item label="成本价">
                <span>{{ props.row.cost }}</span>
              </el-form-item>
              <el-form-item label="收藏数量">
                <span>{{ props.row.collect }}</span>
              </el-form-item>
              <el-form-item label="虚拟销量">
                <span>{{ props.row.ficti }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="id"
          label="商ID"
        />
        <el-table-column
          label="商品图片"
        >
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px;"
              :src="scope.row.image"
              :preview-src-list="[scope.row.image]"
              :preview-teleported="true"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="store_name"
          label="商品名称"
        />
        <el-table-column
          prop="price"
          label="商品售价"
        />
        <el-table-column
          prop="sales"
          label="销量"
          sortable="custom"
        />
        <el-table-column
          prop="stock"
          label="库存"
        />
        <el-table-column
          prop="sort"
          label="排序"
        />
        <el-table-column
          label="状态"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.is_show"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              :active-value="1"
              :inactive-value="0"
              :loading="scope.row.statusLoading"
              active-text="上架"
              inactive-text="下架"
              @change="handleStatuChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          min-width="120px"
          label="操作"
          fixed="right"
          align="center"
        >
          <template #default="scope">
            <el-button
              type="text"
            >
              编辑
            </el-button>
            <el-button type="text">
              查看评论
            </el-button>
            <el-popconfirm
              :title="scope.row.is_del ? '确定恢复商品吗?' : '确定移动到回收站吗？'"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button type="text">
                  {{ scope.row.is_del ? '恢复商品' : '移动到回收站' }}
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
    </app-card>
  </page-container>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'

import * as productApi from '@/api/product'
import type {
  Product,
  ProductType,
  ProductListParams,
  ProductCategory
} from '@/api/types/product'
import { ElMessage } from 'element-plus'
import { Search, Plus, Document } from '@element-plus/icons-vue'

const list = ref<Product[]>([]) // 列表数据
const listCount = ref(0)
const listLoading = ref(true)
const listParams = reactive<ProductListParams>({ // 列表数据查询参数
  page: 1,
  limit: 10,
  cate_id: null,
  store_name: ''
})
const productTypes = ref<ProductType[]>([])
const ProductCates = ref<ProductCategory[]>([])

const loadList = async () => {
  listLoading.value = true
  const data = await productApi.getproducts(listParams).finally(() => {
    listLoading.value = false
  })
  data.list.forEach((item) => {
    item.statusLoading = false
  })
  list.value = data.list
  listCount.value = data.count
  loadProductTypes()
}

const loadProductTypes = async () => {
  const data = await productApi.getProductTypes()
  productTypes.value = data.list
}

const loadProductCates = async () => {
  const data = await productApi.getCategoryTree(1)
  ProductCates.value = data
}

onMounted(() => {
  loadList()
  loadProductCates()
})

const handleQuery = () => {
  loadList()
}

const selectItems = ref<Product[]>([])

const handleSelectionChange = (val: Product[]) => {
  selectItems.value = val
}

const handleSortChange = ({ prop, order }: { prop: string, order: 'descending' | 'ascending' |null }) => {
  let sales: ProductListParams['sales'] = 'normal'
  switch (order) {
    case 'ascending':
      sales = 'asc'
      break
    case 'descending':
      sales = 'desc'
      break
  }
  listParams.sales = sales
  loadList()
}

const updateProductsShowLoading = ref(false)
const handleUpdateProductsShow = async () => {
  updateProductsShowLoading.value = true
  await productApi.updateProductsShow(selectItems.value.map(item => item.id)).finally(() => {
    updateProductsShowLoading.value = false
  })
  loadList()
  ElMessage.success('商品批量上架成功')
}

const updateProductsUnShowLoading = ref(false)
const handleUpdateProductsUnshow = async () => {
  updateProductsUnShowLoading.value = true
  await productApi.updateProductsUnShow(selectItems.value.map(item => item.id)).finally(() => {
    updateProductsUnShowLoading.value = false
  })
  loadList()
  ElMessage.success('商品批量下架成功')
}
const handleDelete = async (item: Product) => {
  await productApi.removeProduct(item.id)
  ElMessage.success(`${item.is_del ? '恢复商品' : '移动到回收站'}成功`)
  loadList()
}

const handleStatuChange = async (item: Product) => {
  item.statusLoading = true
  await productApi.updateProductStatus(item.id, item.is_show).finally(() => {
    item.statusLoading = false
  })
  ElMessage.success(`${item.is_show ? '上架' : '下架'}成功`)
  loadList()
}

const exportExcelLoading = ref(false)
const handleExportExcel = async () => {
  if (!selectItems.value.length) {
    ElMessage.warning('请选择要导出的商品')
    return
  }
  exportExcelLoading.value = true
  try {
    const { jsonToExcel } = await import('@/utils/export-to-excel')
    jsonToExcel({
      data: selectItems.value,
      header: { id: '编号', name: '姓名', age: '年龄' },
      fileName: '测试2.xlsx',
      bookType: 'xlsx'
    })
  } catch (err) {
    console.log(err)
  }
  exportExcelLoading.value = false
}

</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
  :deep(label) {
    width: 90px;
    color: #99a9bf;
  }
  :deep(.el-form-item) {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>

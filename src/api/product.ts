import request from '@/utils/request'
import {
  Product,
  ProductType,
  ProductListParams,
  ProductCategory,
  ProductAttrTpl,
  AttrRuleValue,
  AttrTableHeader,
  ProductAttr
} from './types/product'

/**
 * 获取商品类目列表
 * @returns 商品类目列表
 */
export const getProductTypes = () => {
  return request<{
    list: ProductType[]
  }>({
    method: 'GET',
    url: '/admin/product/product/type_header'
  })
}

/**
 * 获取商品列表
 * @param params 查询参数
 * @returns 商品列表
 */
export const getproducts = (params?: ProductListParams) => {
  return request<{
      count: number,
      list: Product[]
    }>({
      method: 'GET',
      url: '/admin/product/product',
      params
    })
}

export const getCategoryTree = (type: 0 | 1) => {
  return request<ProductCategory[]>({
    method: 'GET',
    url: `/admin/product/category/tree/${type}`
  })
}

/**
 * 商品上下架操作
 */
export const updateProductStatus = (id: number, status: number) => {
  return request({
    method: 'PUT',
    url: `/admin/product/product/set_show/${id}/${status}`
  })
}

/**
 * 商品批量上架
 * @param ids 上架商品id
 * @returns
 */
export const updateProductsShow = (ids: number[]) => {
  return request({
    method: 'PUT',
    url: '/admin/product/product/product_show',
    data: {
      ids
    }
  })
}

/**
 * 商品批量下架
 * @param ids 下架商品id
 * @returns
 */
export const updateProductsUnShow = (ids: number[]) => {
  return request({
    method: 'PUT',
    url: '/admin/product/product/product_unshow',
    data: {
      ids
    }
  })
}

/**
 * 商品加入/移出回收站
 */
export const removeProduct = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/admin/product/product/${id}`
  })
}

/**
 * 保存新增或编辑
 * @param id 商品ID
 * @param data 商品数据
 * @returns null
 */
export const saveProduct = (id: number, data: any) => {
  return request({
    method: 'POST',
    url: `/admin/product/product/${id}`,
    data
  })
}

/**
 * 获取商品规格模板
 */
export const getAttrs = () => {
  return request<ProductAttrTpl[]>({
    method: 'GET',
    url: '/admin/product/product/get_rule'
  })
}

/**
 * 生成商品属性
 */
export const generateAttr = (id: number, type: 0 | 1, data: {
  attrs: AttrRuleValue[]
}) => {
  return request<{
    info: {
      attr: AttrRuleValue[]
      header: AttrTableHeader[]
      value: ProductAttr[]
    }
  }>({
    method: 'POST',
    url: `/admin/product/generate_attr/${id}/${type}`,
    data
  })
}

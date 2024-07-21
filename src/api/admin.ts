import request from '@/utils/request'
import { IListParam, IAdmin, IAdminPostData } from './types/admin'
import { IFormData } from './types/form'

export const getAdmins = (params: IListParam) => {
  return request<{
    count: number,
    list: IAdmin[]
  }>({
    method: 'GET',
    url: '/admin/setting/admin',
    params
  })
}

export const createAdmin = (data: IAdminPostData) => {
  return request({
    method: 'POST',
    url: '/admin/setting/admin',
    data
  })
}

export const updateAdmin = (id: number, data: IAdminPostData) => {
  return request({
    method: 'PUT',
    url: `/admin/setting/admin/${id}`,
    data
  })
}

export const deleteAdmin = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/admin/setting/admin/${id}`
  })
}

export const updateAdminStatus = (id: number, status: number) => {
  return request({
    method: 'PUT',
    url: `/admin/setting/set_status/${id}/${status}`
  })
}

export const getRoles = () => {
  return request<IFormData>({
    method: 'GET',
    url: '/admin/setting/admin/create'
  }).then(res => {
    const roles = res.rules.find(item => item.field === 'roles')
    if (roles && roles.options) {
      return roles.options
    }
  })
}

export const getAdmin = (id: number) => {
  return request<IFormData>({
    method: 'GET',
    url: `/admin/setting/admin/${id}/edit`
  }).then(data => {
    const obj: Record<string, any> = {}
    data.rules.forEach((item) => {
      obj[item.field] = item.value
    })
    return obj as IAdminPostData
  })
}

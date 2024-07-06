import request from '@/utils/request'
import { ILoginInfo, IloginResponse } from './types/common'

// interface ResponseData<T = any> {
//     status: number,
//     msg: string,
//     data: T
// }
export const getLoginInfo = () => {
  return request<ILoginInfo>({
    method: 'GET',
    url: '/admin/login/info'
  })
  // return request.get<ResponseData<{
  //   login_logo: string,
  //   logo_rectangle: string,
  //   logo_square: string,
  //   slide: string []
  // }>>('/login/info').then(res => {
  //   return res.data
  // })
}

export const getCaptcha = () => {
  return request<Blob>({
    method: 'GET',
    url: '/admin/captcha_pro',
    params: {
      stamp: Date.now()
    },
    responseType: 'blob' // 请求图片类型数据
  })
}

export const login = (data: {
  account: string,
  pwd: string,
  imgcode: string
}) => {
  return request<IloginResponse>({
    method: 'POST',
    url: '/admin/login',
    data
  })
}

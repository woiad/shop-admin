import request from '@/utils/request'
import { ILoginInfo } from './types/common'

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

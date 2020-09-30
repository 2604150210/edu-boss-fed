/**
 * 用户相关请求模块
 */
import qs from 'qs'
import request from '@/utils/request'

interface User {
  phone: string
  password: string
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login', // 此处要走代理，否则无法跨域请求
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data) // axios 默认发送是 application/json 格式的数据
  })
}

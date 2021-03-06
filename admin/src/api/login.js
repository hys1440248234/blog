import request from '@/utils/request'
// 登录
export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
// 获得 token 信息
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
// 退出
export function logout() {
  return request({
    url: '/user/loginout',
    method: 'post'
  })
}

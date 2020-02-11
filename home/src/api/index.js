import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  // 设置超时时间
  timeout: 60000,
  baseURL: process.env.BASE_URL
})

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes('timeout')) {
        Message.error('请求超时，请检查网络是否连接正常')
      } else {
        // 可以展示断网组件
        Message.error('请求失败，请检查网络是否已连接')
      }
      return
    }
    return Promise.reject(error)
  },
)

/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(
  (response) => {
    const responseCode = response.status
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (responseCode === 200) {
      return Promise.resolve(response)
    }
    return Promise.reject(response)
  },
  (error) => {
    // 服务器返回不是 2 开头的情况，会进入这个回调
    // 可以根据后端返回的状态码进行不同的操作
    const responseCode = error.response.status
    switch (responseCode) {
      // 404请求不存在
      case 404:
        Message({
          message: '网络请求不存在',
          type: 'error'
        })
        break
        // 其他错误，直接抛出错误提示
      default:
        Message({
          message: error.response.data.message,
          type: 'error'
        })
    }
    return Promise.reject(error)
  },
)

export default service

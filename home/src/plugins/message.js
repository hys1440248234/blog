// 消息提示
import { Message } from 'element-ui'

const message = {}
message.install = (Vue) => {
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$message = Message
}
export default message

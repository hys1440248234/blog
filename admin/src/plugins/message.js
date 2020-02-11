// 消息提示
import { Message } from 'element-ui'

const message = {}
message.install = (Vue) => {
  Vue.prototype.$message = Message
}
export default message

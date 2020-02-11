// 语法高亮指令
import 'highlight.js/styles/a11y-dark.css'
import hljs from 'highlight.js'

const Highlight = {}
Highlight.install = (Vue) => {
  Vue.directive('hljs', (el) => {
    const blocks = el.querySelectorAll('pre code')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
}
export default Highlight

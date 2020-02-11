import { shallowMount } from '@vue/test-utils'
import AddArticle from '@/components/AddArticle.vue'

describe('AddArticle.vue', () => {
  it('add article', () => {
    const inputValue = 'CSS'
    const form = {
      content: '内容',
      summary: '文章概述',
      title: '文章标题',
      tag: 'CSS',
      content_text: '内容',
      image_url: 'https://cdn.nlark.com/yuque/0/2018/png/213898/1543129752709-d09e64f8-dddb-4a0e-b9d2-377d79e6a416.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_192%2Ch_192%2Fformat%2Cpng'
    }
    const wrapper = shallowMount(AddArticle, {
      propsData: { form, inputValue }
    })
    expect(wrapper.findAll)
  })
})

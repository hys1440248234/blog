import request from './index'

// 获得文章信息
export function getArticleList(query) {
  return request({
    url: `/article?limit=${query.limit}&offset=${query.offset}`,
    method: 'get'
  })
}

// 获得一篇文章
export function getOneArticle(id) {
  return request({
    url: `/article/${id}`,
    method: 'get'
  })
}

// 获取文章总数
export function articleCount() {
  return request({
    url: `/articleCount`,
    method: 'get'
  })
}

// 喜欢一篇文章
export function articleLike() {
  return request({
    url: `/like`,
    method: 'get'
  })
}

// 浏览一篇文章


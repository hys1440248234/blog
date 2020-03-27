import request from '../utils/request'

// 创建文章
export function createArticle(query) {
  return request({
    url: '/article',
    method: 'post',
    data: query
  })
}

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

// 更新文章
export function updateArticle(param) {
  return request({
    url: `/article/${param.id}`,
    method: 'put',
    data: param
  })
}

// 删除文章
export function deleteArticle(param) {
  return request({
    url: `/article/${param.id}`,
    method: 'delete'
  })
}

// 获取文章总数
export function articleCount() {
  return request({
    url: `/articleCount`,
    method: 'get'
  })
}

// 上传文件
export function upload(data) {
  return request(data)
}

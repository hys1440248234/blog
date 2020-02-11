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
export function updateArticle(query) {
  return request({
    url: `/article/${query.id}`,
    method: 'put',
    data: query
  })
}

// 删除文章
export function deleteArticle(query) {
  return request({
    url: `/article/${query.id}`,
    method: 'delete'
  })
}

// 上传文件
export function upload(data) {
  return request(data)
}

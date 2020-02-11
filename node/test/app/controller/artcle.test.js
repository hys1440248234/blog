'use strict';

const { app } = require('egg-mock/bootstrap');

describe('controller/artcle', async () => {
  it('get all article success', async () => {
    await app
      .httpRequest()
      .get('/api/article')
      .expect(200);
  });

  it('get article count success', async () => {
    await app
      .httpRequest()
      .get('/api/articleCount')
      .expect(200);
  });

  it('get one article success', async () => {
    await app
      .httpRequest()
      .get('/api/article/1')
      .expect(200);
  });

  it('update article success', async () => {
    await app
      .httpRequest()
      .put('/api/article/1')
      .send({
        id: 1,
        title: '做项目时遇到的问题以及解决方案',
      })
      .expect(200);
  });

  it('create artilce success', async () => {
    await app
      .httpRequest()
      .post('/api/article')
      .send({
        id: 4,
        title: '测试标题',
        content: '## 测试内容',
        summary: '测试描述',
        contentText: '测试文本内容',
        createtime: 1553347247,
        tag: 'Vue,JavaScript',
        imageUrl: '/img/1553663906782.jpg',
      })
      .expect(200);
  });

  it('delete artilce success', async () => {
    await app
      .httpRequest()
      .delete('/api/article/5')
      .expect(200);
  });

  it('like add 1 success', async () => {
    await app
      .httpRequest()
      .get('/api/like')
      .send({
        id: 1,
        like: 1,
      })
      .expect(200);
  });

  it('view add 1 success', async () => {
    await app
      .httpRequest()
      .get('/api/view')
      .send({
        id: 1,
        view: 1,
      })
      .expect(200);
  });

});

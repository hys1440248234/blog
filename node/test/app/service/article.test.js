'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('service/article', async () => {
  it('insert article success', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.article.insert({
      id: 2,
      title: '测试标题',
      content: '## 测试内容',
      summary: '测试描述',
      contentText: '测试文本内容',
      createtime: 1553347247,
      tag: 'Vue,JavaScript',
      imageUrl: '/img/1553663906782.jpg',
    });
    assert(result);
    assert(result === 1);
  });

  it('find exists article', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.article.find({});
    assert(result);
  });

  it('findOne exists article', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.article.findOne(1);
    assert(result);
  });


  it('update article success', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.article.update({
      id: 1,
      title: '做项目时遇到的问题以及解决方案',
    });
    assert(result === 1);
  });

  it('destroy article success', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.article.destroy(3);
    assert(result === 1);
  });

  it('destroy article failure', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.article.destroy(9999);
    assert(result === 0);
  });

  it('article like add 1 success', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.article.like({
      like: 1,
      id: 1,
    });
    assert(result === 1);
  });

  it('article like add 1 failure', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.article.like({
      like: 1,
      id: 9999,
    });
    assert(result === 0);
  });

  it('article view add 1 success', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.article.view({
      view: 1,
      id: 1,
    });
    assert(result === 1);
  });

  it('article view add 1 failure', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.article.view({
      view: 1,
      id: 9999,
    });
    assert(result === 0);
  });

  it('show article count success', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.article.count();
    assert(result);
  });
});

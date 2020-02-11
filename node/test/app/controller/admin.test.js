'use strict';

const { app } = require('egg-mock/bootstrap');

describe('contoller/admin', async () => {
  it('Get /admin', async () => {
    await app
      .httpRequest()
      .get('/admin')
      .expect(200);
  });
});

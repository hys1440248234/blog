'use strict';

const { app } = require('egg-mock/bootstrap');

describe('controller/home', async () => {
  it('should GET /', async () => {
    await app
      .httpRequest()
      .get('/')
      .expect(200);
  });
});

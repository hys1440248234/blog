'use strict';

const { app } = require('egg-mock/bootstrap');

describe('controller/user', async () => {
  it('login suceess', async () => {
    await app
      .httpRequest()
      .post('/api/user/login')
      .send({
        username: 'admin',
        password: 'admin',
      })
      .expect(200);
  });

  it('get login info success', async () => {
    await app
      .httpRequest()
      .get('/api/user/info')
      .expect(200);
  });

  it('loginout suceess', async () => {
    await app
      .httpRequest()
      .post('/api/user/loginout')
      .expect(200);
  });
});

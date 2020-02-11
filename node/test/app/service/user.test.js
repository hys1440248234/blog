'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('service/user', async () => {
  it('has user or not', async () => {
    const ctx = app.mockContext();
    const user = await ctx.service.user.index('admin');
    assert(user);
  });

  it('should get null when user not exist', async () => {
    const ctx = app.mockContext();
    const user = await ctx.service.user.index('wenhua');
    assert(!user);
  });
});

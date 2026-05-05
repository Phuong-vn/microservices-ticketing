import request from 'supertest';
import { app } from '../../app.ts';
import { COOKIE_NAME } from '../../config.ts';

beforeEach(async () => {
  await global.signin();
});

it('clear the cookie after success signing out', async () => {
  const response = await request(app).get('/api/users/signout').expect(200);
  const cookie = response.get('Set-Cookie');
  if (!cookie) {
    throw new Error('Expected cookie but got undefined.');
  }
  expect(cookie[0]).toEqual(
    `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly`,
  );
});

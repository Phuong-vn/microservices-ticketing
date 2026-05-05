import request from 'supertest';
import { app } from '../../app.ts';

let cookie: string[] | undefined;

beforeEach(async () => {
  cookie = await global.signin();
});

it('return 200 and success getting user information', async () => {
  if (!cookie) {
    throw new Error('Expected cookie but got undefined.');
  }
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(200);
  const currentUser = response.body.currentUser;
  expect(currentUser.email).toEqual('test@test.com');
});

it('return null after signing out', async () => {
  await request(app).get('/api/users/signout').expect(200);
  const response = await request(app).get('/api/users/currentuser').expect(200);
  const currentUser = response.body.currentUser;
  expect(currentUser).toEqual(null);
});

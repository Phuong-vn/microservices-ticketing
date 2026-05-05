import request from 'supertest';
import { app } from '../../app.ts';

beforeEach(
  async () =>
    await request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'password',
    }),
);

it('return 200 on success signin', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);
});

it('return 400 on wrong email or password format', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'wrong-email',
      password: 'password',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '',
    })
    .expect(400);
});

it('return 401 on wrong email or password compare to database', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'wrong-email@test.com',
      password: 'password',
    })
    .expect(401);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'wrong-password',
    })
    .expect(401);
});

it('return cookie in the header', async () => {
  const res = await request(app).post('/api/users/signin').send({
    email: 'test@test.com',
    password: 'password',
  });

  expect(res.get('Set-Cookie')).toBeDefined();
});

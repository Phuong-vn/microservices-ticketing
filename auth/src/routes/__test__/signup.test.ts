import request from 'supertest';
import { app } from '../../app.ts';
import { it } from '@jest/globals';

it('return 201 on success signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

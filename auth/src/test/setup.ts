import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app.ts';

let mongo: MongoMemoryServer;

declare global {
  var signin: () => Promise<string[]>;
}

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();
  collections?.forEach(async (collection) => await collection.deleteMany());
});

afterAll(async () => {
  await mongo?.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const user = {
    email: 'test@test.com',
    password: 'password',
  };
  await request(app).post('/api/users/signup').send(user);
  const response = await request(app).post('/api/users/signin').send(user);
  const cookie = response.get('Set-Cookie');
  if (!cookie) {
    throw new Error('Expected cookie but got undefined.');
  }
  return cookie;
}

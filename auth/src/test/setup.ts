import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app.ts';

declare global {
  var signin: () => Promise<string[]>;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '..', '..', '..', '.env') });

let mongo: MongoMemoryServer;

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
    throw new Error('failed to load cookie from the response');
  }
  return cookie;
};

import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = await scryptAsync(password, salt, 64) as Buffer;
    return `${buffer.toString('hex')}.${salt}`;
  }
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashed, salt] = storedPassword.split('.');
    const buffer = await scryptAsync(suppliedPassword, salt as string, 64) as Buffer;
    return buffer.toString('hex') === hashed;
  }
}

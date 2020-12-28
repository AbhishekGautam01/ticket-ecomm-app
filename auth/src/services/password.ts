import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

//Scrypt is call back based system so we use promisify to convert it to promise so it becomes compatible with async/await
const scryptAsync = promisify(scrypt);

export class Password {
  static async tohash(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<Boolean> {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString('hex') === hashedPassword;
  }
}

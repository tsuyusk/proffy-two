import * as bcrypt from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async compare(hashed: string, payload: string): Promise<boolean> {
    return bcrypt.compare(hashed, payload);
  }

  public async generate(payload: string): Promise<string> {
    return bcrypt.hash(payload, 8);
  }
}

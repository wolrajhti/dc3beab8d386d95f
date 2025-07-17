import argon from 'argon2';

export class PasswordHashService {
  hash(password: string): Promise<string> {
    return argon.hash(password);
  }
  verify(digest: string, hash: string): Promise<boolean> {
    return argon.verify(digest, hash);
  }
}

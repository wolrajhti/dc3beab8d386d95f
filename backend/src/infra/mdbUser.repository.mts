import { User } from "../domain/user.mts";
import { type IUserRepository } from "../domain/user.repository.mts";
import { type Collection, ObjectId } from 'mongodb';

export class MdbUserRepository implements IUserRepository {
  private readonly collection: Collection;
  constructor(collection: Collection) {
    this.collection = collection;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const raw = await this.collection.findOne({email}) as any; // TODO à cleaner
    if (raw) {
      return new User(raw);
    }
  }

  async register(user: User): Promise<void> {
    await this.collection.insertOne({
      _id: new ObjectId(user._id),
      email: user.email,
      passwordHash: user.passwordHash
    });
  }
}

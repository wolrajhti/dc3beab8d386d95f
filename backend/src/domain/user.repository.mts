import { User } from "./user.mts";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  register(user: User): Promise<void>;
}

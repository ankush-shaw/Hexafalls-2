import { User, IUser } from '../models/user.model.js';

export class UserRepository {
  async findByEmail(email: string, includePassword = false): Promise<IUser | null> {
    const query = User.findOne({ email });
    if (includePassword) query.select('+passwordHash +refreshToken');
    return query.lean<IUser>().exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).lean<IUser>().exec();
  }

  async create(data: Partial<IUser>): Promise<IUser> {
    const user = new User(data);
    return user.save() as unknown as IUser;
  }

  async updateRefreshToken(userId: string, token: string | null): Promise<void> {
    await User.findByIdAndUpdate(userId, { refreshToken: token });
  }

  async updateLastLogin(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { lastLogin: new Date() });
  }
}

export const userRepository = new UserRepository();
export default userRepository;

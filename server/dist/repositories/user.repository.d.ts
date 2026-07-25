import { IUser } from '../models/user.model.js';
export declare class UserRepository {
    findByEmail(email: string, includePassword?: boolean): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    create(data: Partial<IUser>): Promise<IUser>;
    updateRefreshToken(userId: string, token: string | null): Promise<void>;
    updateLastLogin(userId: string): Promise<void>;
}
export declare const userRepository: UserRepository;
export default userRepository;

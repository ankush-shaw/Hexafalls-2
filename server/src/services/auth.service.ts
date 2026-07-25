import { userRepository } from '../repositories/user.repository.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.js';
import { UnauthorizedError, BadRequestError } from '../utils/apiError.js';
import { RegisterInput, LoginInput } from '../validators/auth.validator.js';
import { IUser } from '../models/user.model.js';

class AuthService {
  async register(input: RegisterInput) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) throw new BadRequestError('An account with this email already exists.');

    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash: input.password,
      role: input.role ?? 'viewer',
    });

    return this.issueTokens(user);
  }

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email, true);
    if (!user) throw new UnauthorizedError('Invalid email or password.');

    const isPasswordValid = await (user as IUser).comparePassword(input.password);
    if (!isPasswordValid) throw new UnauthorizedError('Invalid email or password.');

    await userRepository.updateLastLogin(String(user._id));
    const tokens = this.issueTokens(user);
    await userRepository.updateRefreshToken(String(user._id), tokens.refreshToken);

    return tokens;
  }

  async refresh(token: string) {
    let payload: { userId: string; role: string };
    try {
      payload = verifyRefreshToken(token);
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token.');
    }

    const user = await userRepository.findById(payload.userId);
    if (!user) throw new UnauthorizedError('User not found.');

    const tokens = this.issueTokens(user);
    await userRepository.updateRefreshToken(payload.userId, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    await userRepository.updateRefreshToken(userId, null);
  }

  private issueTokens(user: IUser) {
    const payload = { userId: String(user._id), role: user.role };
    return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}

export const authService = new AuthService();
export default authService;

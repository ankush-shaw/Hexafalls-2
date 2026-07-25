import { RegisterInput, LoginInput } from '../validators/auth.validator.js';
declare class AuthService {
    register(input: RegisterInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("../models/user.model.js").UserRole;
        };
    }>;
    login(input: LoginInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("../models/user.model.js").UserRole;
        };
    }>;
    refresh(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("../models/user.model.js").UserRole;
        };
    }>;
    logout(userId: string): Promise<void>;
    private issueTokens;
}
export declare const authService: AuthService;
export default authService;

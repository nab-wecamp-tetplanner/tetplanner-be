import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    verifyOtp(body: {
        email: string;
        otp: string;
    }): Promise<{
        message: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        userId: string;
        accessToken: string;
    }>;
    forgotPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    resetPassword(body: {
        email: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    changePassword(body: {
        oldPassword: string;
        newPassword: string;
    }, req: any): Promise<{
        message: string;
    }>;
}

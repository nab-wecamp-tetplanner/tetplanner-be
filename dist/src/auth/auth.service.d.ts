import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { OtpService } from './otp/otp.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private readonly otpService;
    private jwtService;
    private brevoClient;
    constructor(userRepository: Repository<User>, otpService: OtpService, jwtService: JwtService);
    private sendVerificationEmail;
    signup(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        message: string;
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        userId: string;
        accessToken: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(email: string, newPassword: string): Promise<{
        message: string;
    }>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
}

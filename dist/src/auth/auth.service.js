"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const brevo_1 = require("@getbrevo/brevo");
const user_entity_1 = require("../users/entities/user.entity");
const otp_service_1 = require("./otp/otp.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userRepository;
    otpService;
    jwtService;
    brevoClient;
    constructor(userRepository, otpService, jwtService) {
        this.userRepository = userRepository;
        this.otpService = otpService;
        this.jwtService = jwtService;
        this.brevoClient = new brevo_1.BrevoClient({ apiKey: process.env.BREVO_API_KEY });
    }
    async sendVerificationEmail(email, otp, isReset) {
        const subject = isReset ? 'Reset your password' : 'Verify your email';
        const html = isReset
            ? `
        <p>Hello,</p>
        <p>Here is the OTP Code for reseting password:</p>
        <p><strong>${otp}</strong></p>
        <p>If you did not request, please ignore this email.</p>
      `
            : `
        <p>Hello,</p>
        <p>Here is your sign-up code:</p>
        <p><strong>${otp}</strong></p>
        <p>If you did not request, please ignore this email.</p>
      `;
        await this.brevoClient.transactionalEmails.sendTransacEmail({
            subject,
            htmlContent: html,
            sender: { name: 'TetPlanner', email: process.env.BREVO_FROM },
            to: [{ email }],
        });
    }
    async signup(createUserDto) {
        const existing = await this.userRepository.findOne({ where: { email: createUserDto.email } });
        if (existing) {
            throw new common_1.ConflictException('Email already exists');
        }
        const passwordHash = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({
            email: createUserDto.email,
            name: createUserDto.name,
            password_hash: passwordHash,
            is_verified: false,
        });
        await this.userRepository.save(user);
        const otp = this.otpService.generateOtp(createUserDto.email);
        try {
            await this.sendVerificationEmail(createUserDto.email, otp, false);
        }
        catch (err) {
            console.error('[Brevo] sendVerificationEmail error:', err);
            this.otpService.clearOtp(createUserDto.email);
            await this.userRepository.remove(user);
            throw new common_1.InternalServerErrorException('Failed to send verification email. Please try again.');
        }
        return { message: 'User created. Please verify your email with the OTP sent.' };
    }
    async verifyOtp(email, otp) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        this.otpService.verifyOtp(email, otp);
        if (!user.is_verified) {
            user.is_verified = true;
            await this.userRepository.save(user);
        }
        this.otpService.markVerified(email);
        return { message: 'OTP verified successfully' };
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.is_verified) {
            throw new common_1.UnauthorizedException('Email not verified');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { userId: user.id, email: user.email };
        return { message: 'Login successful', userId: user.id, accessToken: this.jwtService.sign(payload) };
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const otp = this.otpService.generateOtp(email);
        try {
            await this.sendVerificationEmail(email, otp, true);
        }
        catch (err) {
            console.error('[Brevo] sendVerificationEmail error:', err);
            this.otpService.clearOtp(email);
            throw new common_1.InternalServerErrorException('Failed to send verification email. Please try again.');
        }
        return { message: 'OTP sent to email' };
    }
    async resetPassword(email, newPassword) {
        if (!this.otpService.consumeVerified(email)) {
            throw new common_1.BadRequestException('OTP verification required before resetting password');
        }
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.password_hash = await bcrypt.hash(newPassword, 10);
        await this.userRepository.save(user);
        return { message: 'Password reset successfully' };
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password_hash);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Invalid old password');
        }
        user.password_hash = await bcrypt.hash(newPassword, 10);
        await this.userRepository.save(user);
        return { message: 'Password changed successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        otp_service_1.OtpService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
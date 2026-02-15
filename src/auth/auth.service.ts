import { Injectable, BadRequestException, ConflictException, UnauthorizedException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { OtpService } from './otp/otp.service';
import { PayLoadType } from './interfaces/payload.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly otpService: OtpService,
    private jwtService: JwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  private async sendVerificationEmail(email: string, otp: string, isReset: boolean) {
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

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject,
      html,
    });
  }

  async signup(createUserDto: CreateUserDto) {
    const existing = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existing) {
      throw new ConflictException('Email already exists');
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
    } catch {
      this.otpService.clearOtp(createUserDto.email);
      await this.userRepository.remove(user);
      throw new InternalServerErrorException('Failed to send verification email. Please try again.');
    }

    return { message: 'User created. Please verify your email with the OTP sent.' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.otpService.verifyOtp(email, otp);

    if (!user.is_verified) {
      user.is_verified = true;
      await this.userRepository.save(user);
    }

    // mark email as OTP-verified so resetPassword can proceed
    this.otpService.markVerified(email);

    return { message: 'OTP verified successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.is_verified) {
      throw new UnauthorizedException('Email not verified');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: PayLoadType = { userId: user.id, email: user.email };
    return { message: 'Login successful', userId: user.id, accessToken: this.jwtService.sign(payload) };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const otp = this.otpService.generateOtp(email);
    try {
      await this.sendVerificationEmail(email, otp, true);
    } catch {
      this.otpService.clearOtp(email);
      throw new InternalServerErrorException('Failed to send verification email. Please try again.');
    }

    return { message: 'OTP sent to email' };
  }

  async resetPassword(email: string, newPassword: string) {
    // only allow reset if OTP was verified via /verify-otp
    if (!this.otpService.consumeVerified(email)) {
      throw new BadRequestException('OTP verification required before resetting password');
    }

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password_hash = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);

    return { message: 'Password reset successfully' };
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid old password');
    }

    user.password_hash = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);

    return { message: 'Password changed successfully' };
  }
}

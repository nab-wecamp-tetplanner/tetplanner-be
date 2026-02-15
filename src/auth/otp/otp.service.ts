import { BadRequestException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class OtpService {
  private readonly OTP_EXPIRATION_MS = 5 * 60 * 1000; // 5 minutes
  private otpStore: Map<string, string> = new Map();
  private verifiedEmails: Set<string> = new Set();

  generateOtp(email: string): string {
    const otp = crypto.randomInt(100000, 999999).toString();
    this.otpStore.set(email, otp);

    setTimeout(() => this.otpStore.delete(email), this.OTP_EXPIRATION_MS);

    return otp;
  }

  verifyOtp(email: string, inputOtp: string): boolean {
    const storedOtp = this.otpStore.get(email);
    if (!storedOtp) {
      throw new BadRequestException('OTP not found or expired');
    }
    if (storedOtp !== inputOtp) {
      throw new BadRequestException('Invalid OTP');
    }
    this.otpStore.delete(email);
    return true;
  }

  markVerified(email: string) {
    this.verifiedEmails.add(email);
    setTimeout(() => this.verifiedEmails.delete(email), this.OTP_EXPIRATION_MS);
  }

  consumeVerified(email: string): boolean {
    if (!this.verifiedEmails.has(email)) {
      return false;
    }
    this.verifiedEmails.delete(email);
    return true;
  }

  clearOtp(email: string) {
    this.otpStore.delete(email);
  }
}

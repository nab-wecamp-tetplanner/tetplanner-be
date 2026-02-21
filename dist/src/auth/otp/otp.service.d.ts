export declare class OtpService {
    private readonly OTP_EXPIRATION_MS;
    private otpStore;
    private verifiedEmails;
    generateOtp(email: string): string;
    verifyOtp(email: string, inputOtp: string): boolean;
    markVerified(email: string): void;
    consumeVerified(email: string): boolean;
    clearOtp(email: string): void;
}

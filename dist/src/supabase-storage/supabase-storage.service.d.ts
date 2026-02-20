import { ConfigService } from '@nestjs/config';
export declare class SupabaseStorageService {
    private configService;
    private supabase;
    private readonly avatarBucketName;
    constructor(configService: ConfigService);
    uploadImageFromBuffer(buffer: Buffer, fileName: string, bucketName: string): Promise<string | null>;
    uploadImageFromFile(filePath: string, fileName: string, bucketName: string): Promise<string | null>;
}

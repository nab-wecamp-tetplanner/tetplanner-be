import { ConfigService } from '@nestjs/config';
import { ChatDto } from './dto/chat.dto';
export declare class AiChatService {
    private readonly configService;
    private readonly logger;
    private readonly genAI;
    private readonly modelName;
    constructor(configService: ConfigService);
    chat(dto: ChatDto): Promise<{
        reply: string;
    }>;
}

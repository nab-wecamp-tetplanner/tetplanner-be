import { AiChatService } from './ai_chat.service';
import { ChatDto } from './dto/chat.dto';
export declare class AiChatController {
    private readonly aiChatService;
    constructor(aiChatService: AiChatService);
    chat(dto: ChatDto): Promise<{
        reply: string;
    }>;
}

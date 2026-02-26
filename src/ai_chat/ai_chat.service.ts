import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class AiChatService {
  private readonly logger = new Logger(AiChatService.name);
  private readonly genAI: GoogleGenerativeAI;
  private readonly modelName: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY') ?? '';
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = this.configService.get<string>('GEMINI_MODEL') ?? 'gemini-2.5-flash';
    this.logger.log(`Using Gemini model: ${this.modelName}`);
  }

  async chat(dto: ChatDto): Promise<{ reply: string }> {
    const model = this.genAI.getGenerativeModel({ model: this.modelName });

    const history = (dto.history ?? []).map((h) => ({
      role: h.role === 'assistant' ? 'model' : ('user' as const),
      parts: [{ text: h.content }],
    }));

    const chatSession = model.startChat({ history });
    const result = await chatSession.sendMessage(dto.message);
    const reply = result.response.text();

    return { reply };
  }
}

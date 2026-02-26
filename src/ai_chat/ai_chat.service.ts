import * as fs from 'fs';
import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class AiChatService {
  private readonly logger = new Logger(AiChatService.name);
  private readonly genAI: GoogleGenerativeAI;
  private readonly modelName: string;
  private readonly systemInstruction: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY') ?? '';
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = this.configService.get<string>('GEMINI_MODEL') ?? 'gemini-2.5-flash';

    this.systemInstruction = this.loadSystemPrompt();
    this.logger.log(`Using Gemini model: ${this.modelName}`);
  }

  private loadSystemPrompt(): string {
    try {
      const promptPath = path.join(__dirname, 'prompt', 'project_prompt.json');
      const promptData = JSON.parse(fs.readFileSync(promptPath, 'utf-8'));
      return promptData.system_instruction as string;
    } catch {
      this.logger.warn('Could not load project_prompt.json — using fallback system instruction');
      return 'You are TetBot 🤖🧧, a funny and helpful Tet planning assistant. Help users plan their Vietnamese Lunar New Year celebration, manage their budget wisely, and complete their tasks on time. Use emojis and be warm and fun! 🎆';
    }
  }

  async chat(dto: ChatDto): Promise<{ reply: string }> {
    const model = this.genAI.getGenerativeModel({
      model: this.modelName,
      systemInstruction: this.systemInstruction,
      generationConfig: {
        maxOutputTokens: 800,
      },
    });

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

import { Module } from '@nestjs/common';
import { AiChatService } from './ai_chat.service';
import { AiChatController } from './ai_chat.controller';

@Module({
  controllers: [AiChatController],
  providers: [AiChatService],
})
export class AiChatModule {}

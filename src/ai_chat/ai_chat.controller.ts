import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AiChatService } from './ai_chat.service';
import { ChatDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('ai-chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai-chat')
export class AiChatController {
  constructor(private readonly aiChatService: AiChatService) {}

  @Post()
  @ApiOperation({ summary: 'Chat with AI assistant', description: 'Send a message with optional history to the AI assistant.' })
  @ApiResponse({ status: 201, description: 'AI reply returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async chat(@Body() dto: ChatDto) {
    return this.aiChatService.chat(dto);
  }
}

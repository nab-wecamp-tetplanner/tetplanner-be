import { Test, TestingModule } from '@nestjs/testing';
import { AiChatController } from './ai_chat.controller';
import { AiChatService } from './ai_chat.service';

describe('AiChatController', () => {
  let controller: AiChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiChatController],
      providers: [AiChatService],
    }).compile();

    controller = module.get<AiChatController>(AiChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

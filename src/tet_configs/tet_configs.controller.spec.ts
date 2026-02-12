import { Test, TestingModule } from '@nestjs/testing';
import { TetConfigsController } from './tet_configs.controller';
import { TetConfigsService } from './tet_configs.service';

describe('TetConfigsController', () => {
  let controller: TetConfigsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TetConfigsController],
      providers: [TetConfigsService],
    }).compile();

    controller = module.get<TetConfigsController>(TetConfigsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

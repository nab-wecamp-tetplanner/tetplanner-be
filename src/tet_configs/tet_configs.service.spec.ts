import { Test, TestingModule } from '@nestjs/testing';
import { TetConfigsService } from './tet_configs.service';

describe('TetConfigsService', () => {
  let service: TetConfigsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TetConfigsService],
    }).compile();

    service = module.get<TetConfigsService>(TetConfigsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TimelinePhasesService } from './timeline_phases.service';

describe('TimelinePhasesService', () => {
  let service: TimelinePhasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimelinePhasesService],
    }).compile();

    service = module.get<TimelinePhasesService>(TimelinePhasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TimelinePhasesController } from './timeline_phases.controller';
import { TimelinePhasesService } from './timeline_phases.service';

describe('TimelinePhasesController', () => {
  let controller: TimelinePhasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimelinePhasesController],
      providers: [TimelinePhasesService],
    }).compile();

    controller = module.get<TimelinePhasesController>(TimelinePhasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

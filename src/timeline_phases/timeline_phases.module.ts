import { Module } from '@nestjs/common';
import { TimelinePhasesService } from './timeline_phases.service';
import { TimelinePhasesController } from './timeline_phases.controller';

@Module({
  controllers: [TimelinePhasesController],
  providers: [TimelinePhasesService],
})
export class TimelinePhasesModule {}

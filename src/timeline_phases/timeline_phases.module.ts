import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimelinePhasesService } from './timeline_phases.service';
import { TimelinePhasesController } from './timeline_phases.controller';
import { TimelinePhase } from './entities/timeline_phase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimelinePhase])],
  controllers: [TimelinePhasesController],
  providers: [TimelinePhasesService],
})
export class TimelinePhasesModule {}

import { Injectable } from '@nestjs/common';
import { CreateTimelinePhaseDto } from './dto/create-timeline_phase.dto';
import { UpdateTimelinePhaseDto } from './dto/update-timeline_phase.dto';

@Injectable()
export class TimelinePhasesService {
  create(createTimelinePhaseDto: CreateTimelinePhaseDto) {
    return 'This action adds a new timelinePhase';
  }

  findAll() {
    return `This action returns all timelinePhases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timelinePhase`;
  }

  update(id: number, updateTimelinePhaseDto: UpdateTimelinePhaseDto) {
    return `This action updates a #${id} timelinePhase`;
  }

  remove(id: number) {
    return `This action removes a #${id} timelinePhase`;
  }
}

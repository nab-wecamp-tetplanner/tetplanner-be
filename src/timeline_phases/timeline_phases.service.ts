import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimelinePhase } from './entities/timeline_phase.entity';
import { CreateTimelinePhaseDto } from './dto/create-timeline_phase.dto';
import { UpdateTimelinePhaseDto } from './dto/update-timeline_phase.dto';

@Injectable()
export class TimelinePhasesService {
  constructor(
    @InjectRepository(TimelinePhase)
    private readonly timelinePhaseRepository: Repository<TimelinePhase>,
  ) {}

  async create(createTimelinePhaseDto: CreateTimelinePhaseDto) {
    const phase = this.timelinePhaseRepository.create({
      ...createTimelinePhaseDto,
      tet_config: { id: createTimelinePhaseDto.tet_config_id },
    });
    return this.timelinePhaseRepository.save(phase);
  }

  async findAllByTetConfig(tetConfigId: string) {
    return this.timelinePhaseRepository.find({
      where: { tet_config: { id: tetConfigId } },
      order: { display_order: 'ASC' },
    });
  }

  async findOne(id: string) {
    const phase = await this.timelinePhaseRepository.findOne({ where: { id } });
    if (!phase) throw new NotFoundException('Timeline phase not found');
    return phase;
  }

  async update(id: string, updateTimelinePhaseDto: UpdateTimelinePhaseDto) {
    const phase = await this.timelinePhaseRepository.findOne({ where: { id } });
    if (!phase) throw new NotFoundException('Timeline phase not found');
    Object.assign(phase, updateTimelinePhaseDto);
    return this.timelinePhaseRepository.save(phase);
  }

  async remove(id: string) {
    const phase = await this.timelinePhaseRepository.findOne({ where: { id } });
    if (!phase) throw new NotFoundException('Timeline phase not found');
    await this.timelinePhaseRepository.remove(phase);
    return { message: 'Timeline phase deleted successfully' };
  }
}

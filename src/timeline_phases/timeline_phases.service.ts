import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimelinePhase } from './entities/timeline_phase.entity';
import { CreateTimelinePhaseDto } from './dto/create-timeline_phase.dto';
import { UpdateTimelinePhaseDto } from './dto/update-timeline_phase.dto';
import { CollaboratorsService } from '../collaborators/collaborators.service';

@Injectable()
export class TimelinePhasesService {
  constructor(
    @InjectRepository(TimelinePhase)
    private readonly timelinePhaseRepository: Repository<TimelinePhase>,
    private readonly collaboratorsService: CollaboratorsService,
  ) {}

  async create(userId: string, createDto: CreateTimelinePhaseDto) {
    await this.collaboratorsService.checkAccess(userId, createDto.tet_config_id);
    const phase = this.timelinePhaseRepository.create({
      ...createDto,
      tet_config: { id: createDto.tet_config_id },
    });
    return this.timelinePhaseRepository.save(phase);
  }

  async findAllByTetConfig(userId: string, tetConfigId: string) {
    await this.collaboratorsService.checkAccess(userId, tetConfigId);
    return this.timelinePhaseRepository.find({
      where: { tet_config: { id: tetConfigId } },
      order: { display_order: 'ASC' },
    });
  }

  async findOne(userId: string, id: string) {
    const phase = await this.timelinePhaseRepository.findOne({
      where: { id },
      relations: ['tet_config'],
    });
    if (!phase) throw new NotFoundException('Timeline phase not found');
    await this.collaboratorsService.checkAccess(userId, phase.tet_config.id);
    return phase;
  }

  async update(userId: string, id: string, updateDto: UpdateTimelinePhaseDto) {
    const phase = await this.timelinePhaseRepository.findOne({
      where: { id },
      relations: ['tet_config'],
    });
    if (!phase) throw new NotFoundException('Timeline phase not found');
    await this.collaboratorsService.checkAccess(userId, phase.tet_config.id);
    Object.assign(phase, updateDto);
    return this.timelinePhaseRepository.save(phase);
  }

  async remove(userId: string, id: string) {
    const phase = await this.timelinePhaseRepository.findOne({
      where: { id },
      relations: ['tet_config'],
    });
    if (!phase) throw new NotFoundException('Timeline phase not found');
    await this.collaboratorsService.checkAccess(userId, phase.tet_config.id);
    await this.timelinePhaseRepository.remove(phase);
    return { message: 'Timeline phase deleted successfully' };
  }
}

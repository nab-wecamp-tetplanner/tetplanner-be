import { Repository } from 'typeorm';
import { TimelinePhase } from './entities/timeline_phase.entity';
import { CreateTimelinePhaseDto } from './dto/create-timeline_phase.dto';
import { UpdateTimelinePhaseDto } from './dto/update-timeline_phase.dto';
import { CollaboratorsService } from '../collaborators/collaborators.service';
export declare class TimelinePhasesService {
    private readonly timelinePhaseRepository;
    private readonly collaboratorsService;
    constructor(timelinePhaseRepository: Repository<TimelinePhase>, collaboratorsService: CollaboratorsService);
    create(userId: string, createDto: CreateTimelinePhaseDto): Promise<TimelinePhase>;
    findAllByTetConfig(userId: string, tetConfigId: string): Promise<TimelinePhase[]>;
    findOne(userId: string, id: string): Promise<TimelinePhase>;
    update(userId: string, id: string, updateDto: UpdateTimelinePhaseDto): Promise<TimelinePhase>;
    remove(userId: string, id: string): Promise<{
        message: string;
    }>;
}

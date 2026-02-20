import { Repository } from 'typeorm';
import { TimelinePhase } from './entities/timeline_phase.entity';
import { CreateTimelinePhaseDto } from './dto/create-timeline_phase.dto';
import { UpdateTimelinePhaseDto } from './dto/update-timeline_phase.dto';
export declare class TimelinePhasesService {
    private readonly timelinePhaseRepository;
    constructor(timelinePhaseRepository: Repository<TimelinePhase>);
    create(createTimelinePhaseDto: CreateTimelinePhaseDto): Promise<TimelinePhase>;
    findAllByTetConfig(tetConfigId: string): Promise<TimelinePhase[]>;
    findOne(id: string): Promise<TimelinePhase>;
    update(id: string, updateTimelinePhaseDto: UpdateTimelinePhaseDto): Promise<TimelinePhase>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

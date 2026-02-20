import { TimelinePhasesService } from './timeline_phases.service';
import { CreateTimelinePhaseDto } from './dto/create-timeline_phase.dto';
import { UpdateTimelinePhaseDto } from './dto/update-timeline_phase.dto';
export declare class TimelinePhasesController {
    private readonly timelinePhasesService;
    constructor(timelinePhasesService: TimelinePhasesService);
    create(createTimelinePhaseDto: CreateTimelinePhaseDto): Promise<import("./entities/timeline_phase.entity").TimelinePhase>;
    findAllByTetConfig(tetConfigId: string): Promise<import("./entities/timeline_phase.entity").TimelinePhase[]>;
    findOne(id: string): Promise<import("./entities/timeline_phase.entity").TimelinePhase>;
    update(id: string, updateTimelinePhaseDto: UpdateTimelinePhaseDto): Promise<import("./entities/timeline_phase.entity").TimelinePhase>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

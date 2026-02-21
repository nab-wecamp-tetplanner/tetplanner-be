import { TimelinePhasesService } from './timeline_phases.service';
import { CreateTimelinePhaseDto } from './dto/create-timeline_phase.dto';
import { UpdateTimelinePhaseDto } from './dto/update-timeline_phase.dto';
export declare class TimelinePhasesController {
    private readonly timelinePhasesService;
    constructor(timelinePhasesService: TimelinePhasesService);
    create(req: any, createDto: CreateTimelinePhaseDto): Promise<import("./entities/timeline_phase.entity").TimelinePhase>;
    findAllByTetConfig(req: any, tetConfigId: string): Promise<import("./entities/timeline_phase.entity").TimelinePhase[]>;
    findOne(req: any, id: string): Promise<import("./entities/timeline_phase.entity").TimelinePhase>;
    update(req: any, id: string, updateDto: UpdateTimelinePhaseDto): Promise<import("./entities/timeline_phase.entity").TimelinePhase>;
    remove(req: any, id: string): Promise<{
        message: string;
    }>;
}

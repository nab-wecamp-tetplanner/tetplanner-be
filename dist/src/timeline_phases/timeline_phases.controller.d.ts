import { TimelinePhasesService } from './timeline_phases.service';
import { CreateTimelinePhaseDto } from './dto/create-timeline_phase.dto';
import { UpdateTimelinePhaseDto } from './dto/update-timeline_phase.dto';
import type { AuthRequest } from '../helper/interfaces/auth-request.interface';
export declare class TimelinePhasesController {
    private readonly timelinePhasesService;
    constructor(timelinePhasesService: TimelinePhasesService);
    create(req: AuthRequest, createDto: CreateTimelinePhaseDto): Promise<import("./entities/timeline_phase.entity").TimelinePhase>;
    findAllByTetConfig(req: AuthRequest, tetConfigId: string): Promise<import("./entities/timeline_phase.entity").TimelinePhase[]>;
    findOne(req: AuthRequest, id: string): Promise<import("./entities/timeline_phase.entity").TimelinePhase>;
    update(req: AuthRequest, id: string, updateDto: UpdateTimelinePhaseDto): Promise<import("./entities/timeline_phase.entity").TimelinePhase>;
    remove(req: AuthRequest, id: string): Promise<{
        message: string;
    }>;
}

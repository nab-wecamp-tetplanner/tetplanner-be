import { PartialType } from '@nestjs/mapped-types';
import { CreateTimelinePhaseDto } from './create-timeline_phase.dto';

export class UpdateTimelinePhaseDto extends PartialType(CreateTimelinePhaseDto) {}

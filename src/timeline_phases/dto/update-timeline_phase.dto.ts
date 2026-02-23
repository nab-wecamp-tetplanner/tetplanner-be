import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTimelinePhaseDto } from './create-timeline_phase.dto';

export class UpdateTimelinePhaseDto extends PartialType(OmitType(CreateTimelinePhaseDto, ['tet_config_id'] as const)) {}

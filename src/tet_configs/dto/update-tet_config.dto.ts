import { PartialType } from '@nestjs/mapped-types';
import { CreateTetConfigDto } from './create-tet_config.dto';

export class UpdateTetConfigDto extends PartialType(CreateTetConfigDto) {}

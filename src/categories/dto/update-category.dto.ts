import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(OmitType(CreateCategoryDto, ['tet_config_id'] as const)) {}

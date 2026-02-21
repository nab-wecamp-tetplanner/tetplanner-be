import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CollaboratorRole } from '../../helper/enums';

export class UpdateCollaboratorDto {
  @ApiProperty({ enum: CollaboratorRole, description: 'New collaborator role' })
  @IsEnum(CollaboratorRole)
  @IsNotEmpty()
  role!: CollaboratorRole;
}

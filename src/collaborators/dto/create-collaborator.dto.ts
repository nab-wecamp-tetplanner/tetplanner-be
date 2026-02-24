import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { CollaboratorRole } from '../../helper/enums';

export class CreateCollaboratorDto {
  @ApiProperty({ enum: CollaboratorRole, description: 'Collaborator role' })
  @IsEnum(CollaboratorRole)
  @IsNotEmpty()
  role!: CollaboratorRole;

  @ApiProperty({ type: String, description: 'Tet config ID' })
  @IsUUID('4')
  @IsNotEmpty()
  tet_config_id!: string;

  @ApiProperty({ type: String, description: 'User email' })
  @IsNotEmpty()
  user_email!: string;
}

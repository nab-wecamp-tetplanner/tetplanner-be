import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpsertSubtaskDto {
  @ApiProperty({ type: String, description: 'Subtask name' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ type: Boolean, description: 'Whether the subtask is done', default: false })
  @IsBoolean()
  @IsOptional()
  done?: boolean = false;
}

export class RemoveSubtaskDto {
  @ApiProperty({ type: String, description: 'Subtask name to remove' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTimelinePhaseDto {
  @ApiProperty({ type: String, description: 'Phase name' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ type: Date, description: 'Start date' })
  @IsDateString()
  @IsNotEmpty()
  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  start_date!: Date;

  @ApiProperty({ type: Date, description: 'End date' })
  @IsDateString()
  @IsNotEmpty()
  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  end_date!: Date;

  @ApiProperty({ type: Number, description: 'Display order' })
  @IsInt()
  @IsNotEmpty()
  display_order!: number;

  @ApiProperty({ type: String, description: 'Tet config ID' })
  @IsUUID('4')
  @IsNotEmpty()
  tet_config_id!: string;
}

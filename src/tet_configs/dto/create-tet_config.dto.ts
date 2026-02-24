import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTetConfigDto {
  @ApiProperty({ type: Number, description: 'Year of Tet celebration' })
  @IsInt()
  @IsNotEmpty()
  year!: number;

  @ApiProperty({ type: String, description: 'Configuration name' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ type: Number, description: 'Total budget allocated' })
  @IsNumber()
  @IsNotEmpty()
  total_budget!: number;

  @ApiPropertyOptional({ type: String, description: 'Currency code (e.g. VND, USD)', default: 'VND' })
  @IsString()
  @IsOptional()
  currency?: string;
}

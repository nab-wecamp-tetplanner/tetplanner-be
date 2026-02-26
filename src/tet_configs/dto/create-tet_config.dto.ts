import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const SUPPORTED_CURRENCIES = ['VND', 'USD'] as const;

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

  @ApiPropertyOptional({ enum: SUPPORTED_CURRENCIES, default: 'VND', description: 'Currency code' })
  @IsIn(SUPPORTED_CURRENCIES)
  @IsOptional()
  currency?: string;
}

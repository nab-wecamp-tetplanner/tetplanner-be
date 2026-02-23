import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ type: String, description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ type: String, description: 'Category icon', nullable: true })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ type: String, description: 'Hex color code e.g. #FF5733', nullable: true })
  @IsHexColor()
  @IsOptional()
  color?: string;

  @ApiProperty({ type: Number, description: 'Allocated budget', nullable: true })
  @IsNumber()
  @IsOptional()
  allocated_budget?: number;

  @ApiProperty({ type: String, description: 'Tet config ID' })
  @IsUUID('4')
  @IsNotEmpty()
  tet_config_id!: string;
}

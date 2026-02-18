import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}

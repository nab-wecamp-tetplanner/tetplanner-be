import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { TodoPriority, TodoStatus } from '../../helper/enums';

export class CreateTodoItemDto {
  @ApiProperty({ type: String, description: 'Todo item title' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ enum: TodoPriority, description: 'Priority level', nullable: true })
  @IsEnum(TodoPriority)
  @IsOptional()
  priority?: TodoPriority;

  @ApiProperty({ enum: TodoStatus, description: 'Current status', nullable: true })
  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus;

  @ApiProperty({ type: Date, description: 'Deadline', nullable: true })
  @IsDateString()
  @IsOptional()
  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  deadline?: Date;

  @ApiProperty({ type: Boolean, description: 'Is shopping item', nullable: true })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  is_shopping?: boolean;

  @ApiProperty({ type: Number, description: 'Estimated price', nullable: true })
  @IsNumber()
  @IsOptional()
  estimated_price?: number;

  @ApiProperty({ type: Number, description: 'Quantity', nullable: true })
  @IsInt()
  @IsOptional()
  quantity?: number;

  @ApiProperty({ type: String, description: 'Assigned to user ID', nullable: true })
  @IsUUID('4')
  @IsOptional()
  assigned_to?: string;

  @ApiProperty({ type: String, description: 'Tet config ID' })
  @IsUUID('4')
  @IsNotEmpty()
  tet_config_id!: string;

  @ApiProperty({ type: String, description: 'Timeline phase ID' })
  @IsUUID('4')
  @IsNotEmpty()
  timeline_phase_id!: string;

  @ApiProperty({ type: String, description: 'Category ID' })
  @IsUUID('4')
  @IsNotEmpty()
  category_id!: string;
}

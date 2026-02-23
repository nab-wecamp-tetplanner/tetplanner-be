import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { CreateTodoItemDto } from './create-todo_item.dto';

export class UpdateTodoItemDto extends PartialType(CreateTodoItemDto) {
  @ApiProperty({ type: String, description: 'Category ID', nullable: true })
  @IsUUID('4')
  @IsOptional()
  category_id?: string;

  @ApiProperty({ type: Number, description: 'Estimated price', nullable: true })
  @IsNumber()
  @IsOptional()
  estimated_price?: number;
}

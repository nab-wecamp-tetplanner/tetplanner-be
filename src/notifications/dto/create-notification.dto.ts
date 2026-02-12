import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ type: String, description: 'Notification title' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ type: String, description: 'User ID' })
  @IsUUID('4')
  @IsNotEmpty()
  user_id!: string;

  @ApiProperty({ type: String, description: 'Todo item ID', nullable: true })
  @IsUUID('4')
  @IsOptional()
  todo_item_id?: string;
}

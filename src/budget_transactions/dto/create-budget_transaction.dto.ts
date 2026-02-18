import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { TransactionType } from '../../helper/enums';

export class CreateBudgetTransactionDto {
  @ApiProperty({ type: Number, description: 'Transaction amount' })
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @ApiProperty({ enum: TransactionType, description: 'Transaction type' })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type!: TransactionType;

  @ApiProperty({ type: String, description: 'Transaction note', nullable: true })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ type: Date, description: 'Transaction date' })
  @IsDateString()
  @IsNotEmpty()
  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  transaction_date!: Date;

  @ApiProperty({ type: String, description: 'Tet config ID' })
  @IsUUID('4')
  @IsNotEmpty()
  tet_config_id!: string;

  @ApiProperty({ type: String, description: 'Category ID' })
  @IsUUID('4')
  @IsNotEmpty()
  category_id!: string;

  @ApiProperty({ type: String, description: 'Todo item ID', nullable: true })
  @IsUUID('4')
  @IsOptional()
  todo_item_id?: string;
}

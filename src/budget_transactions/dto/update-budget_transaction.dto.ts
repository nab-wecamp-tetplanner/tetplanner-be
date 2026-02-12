import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetTransactionDto } from './create-budget_transaction.dto';

export class UpdateBudgetTransactionDto extends PartialType(CreateBudgetTransactionDto) {}

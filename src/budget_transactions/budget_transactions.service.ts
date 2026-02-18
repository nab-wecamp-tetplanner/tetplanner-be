import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BudgetTransaction } from './entities/budget_transaction.entity';
import { CreateBudgetTransactionDto } from './dto/create-budget_transaction.dto';
import { UpdateBudgetTransactionDto } from './dto/update-budget_transaction.dto';

@Injectable()
export class BudgetTransactionsService {
  constructor(
    @InjectRepository(BudgetTransaction)
    private readonly transactionRepository: Repository<BudgetTransaction>,
  ) {}

  async create(userId: string, createDto: CreateBudgetTransactionDto) {
    const transaction = this.transactionRepository.create({
      ...createDto,
      tet_config: { id: createDto.tet_config_id },
      category: { id: createDto.category_id },
      todo_item: createDto.todo_item_id ? { id: createDto.todo_item_id } : undefined,
      recorded_by_user: { id: userId },
    });
    return this.transactionRepository.save(transaction);
  }

  async findAllByTetConfig(tetConfigId: string) {
    return this.transactionRepository.find({
      where: { tet_config: { id: tetConfigId } },
      relations: ['category', 'todo_item', 'recorded_by_user'],
    });
  }

  async findOne(id: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['category', 'todo_item', 'recorded_by_user'],
    });
    if (!transaction) {
      throw new NotFoundException('Budget transaction not found');
    }
    return transaction;
  }

  async update(id: string, updateDto: UpdateBudgetTransactionDto) {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException('Budget transaction not found');
    }
    Object.assign(transaction, updateDto);
    if (updateDto.category_id) {
      transaction.category = { id: updateDto.category_id } as any;
    }
    if (updateDto.todo_item_id) {
      transaction.todo_item = { id: updateDto.todo_item_id } as any;
    }
    return this.transactionRepository.save(transaction);
  }

  async remove(id: string) {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException('Budget transaction not found');
    }
    await this.transactionRepository.remove(transaction);
    return { message: 'Budget transaction deleted successfully' };
  }
}

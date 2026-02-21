import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItem } from '../todo_items/entities/todo_item.entity';

@Injectable()
export class BudgetCalculationsService {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
  ) {}

  async calculateTotalUsed(tetConfigId: string): Promise<number> {
    const result = await this.todoItemRepository.createQueryBuilder('todo').select('COALESCE(SUM(todo.estimated_price * todo.quantity), 0)', 'used').where('todo.tet_config_id = :id', { id: tetConfigId }).andWhere('todo.purchased = :purchased', { purchased: true }).getRawOne<{ used: string }>();

    return parseFloat(result?.used ?? '0');
  }

  async calculateUsedByCategory(tetConfigId: string): Promise<Map<string, number>> {
    const categoryRows = await this.todoItemRepository.createQueryBuilder('todo').select('todo.category_id', 'category_id').addSelect('COALESCE(SUM(todo.estimated_price * todo.quantity), 0)', 'used_budget').where('todo.tet_config_id = :id', { id: tetConfigId }).andWhere('todo.purchased = :purchased', { purchased: true }).groupBy('todo.category_id').getRawMany<{ category_id: string; used_budget: string }>();

    return new Map(categoryRows.map((r) => [r.category_id, parseFloat(r.used_budget)]));
  }

  calculatePercentage(used: number, total: number): number {
    return total > 0 ? Math.round((used / total) * 100) : 0;
  }
}

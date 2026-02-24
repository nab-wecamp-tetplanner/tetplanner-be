import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { BudgetTransaction } from '../budget_transactions/entities/budget_transaction.entity';
import { Category } from '../categories/entities/category.entity';
import { CollaboratorsService } from '../collaborators/collaborators.service';
import { BudgetCalculationsService } from '../helper/budget-calculations.service';
import { TodoStatus } from '../helper/enums';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(TetConfig)
    private readonly tetConfigRepository: Repository<TetConfig>,
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
    @InjectRepository(BudgetTransaction)
    private readonly transactionRepository: Repository<BudgetTransaction>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly collaboratorsService: CollaboratorsService,
    private readonly budgetCalculationsService: BudgetCalculationsService,
  ) {}

  async getOverview(userId: string, tetConfigId: string) {
    await this.collaboratorsService.checkAccess(userId, tetConfigId);

    const tetConfig = await this.tetConfigRepository.findOne({ where: { id: tetConfigId } });
    if (!tetConfig) throw new NotFoundException('Tet config not found');

    const items = await this.todoItemRepository.find({ where: { tet_config: { id: tetConfigId } } });

    const total = items.length;
    const completed = items.filter((i) => i.status === TodoStatus.COMPLETED).length;
    const pending = items.filter((i) => i.status === TodoStatus.PENDING).length;
    const in_progress = items.filter((i) => i.status === TodoStatus.IN_PROGRESS).length;
    const overdue = items.filter((i) => i.is_overdue).length;
    const shopping_total = items.filter((i) => i.is_shopping).length;
    const shopping_purchased = items.filter((i) => i.is_shopping && i.purchased).length;
    const completion_rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const now = new Date();
    const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcoming_deadlines = items.filter((i) => i.deadline && i.deadline > now && i.deadline <= in7Days && i.status !== TodoStatus.COMPLETED).length;

    return {
      tet_config: { id: tetConfig.id, name: tetConfig.name, year: tetConfig.year, currency: tetConfig.currency },
      tasks: { total, completed, pending, in_progress, overdue, completion_rate, upcoming_deadlines },
      shopping: { total: shopping_total, purchased: shopping_purchased },
    };
  }

  async getBudgetSummary(userId: string, tetConfigId: string) {
    await this.collaboratorsService.checkAccess(userId, tetConfigId);

    const tetConfig = await this.tetConfigRepository.findOne({ where: { id: tetConfigId } });
    if (!tetConfig) throw new NotFoundException('Tet config not found');

    const totalBudget = Number(tetConfig.total_budget);
    const [usedBudget, plannedBudget, usedByCategory, plannedByCategory] = await Promise.all([this.budgetCalculationsService.calculateTotalUsed(tetConfigId), this.budgetCalculationsService.calculateTotalPlanned(tetConfigId), this.budgetCalculationsService.calculateUsedByCategory(tetConfigId), this.budgetCalculationsService.calculatePlannedByCategory(tetConfigId)]);

    const categories = await this.categoryRepository.find({ where: { tet_config: { id: tetConfigId } } });
    const categoryBreakdown = categories.map((cat) => {
      const catUsed = usedByCategory.get(cat.id) ?? 0;
      const catPlanned = plannedByCategory.get(cat.id) ?? 0;
      const catAllocated = cat.allocated_budget ? Number(cat.allocated_budget) : null;
      return {
        id: cat.id,
        name: cat.name,
        color: cat.color,
        allocated_budget: catAllocated,
        planned_budget: catPlanned,
        used_budget: catUsed,
        remaining_budget: catAllocated !== null ? catAllocated - catPlanned : null,
      };
    });

    return {
      currency: tetConfig.currency,
      total_budget: totalBudget,
      planned_budget: plannedBudget,
      used_budget: usedBudget,
      remaining_budget: totalBudget - plannedBudget,
      percentage_planned: this.budgetCalculationsService.calculatePercentage(plannedBudget, totalBudget),
      percentage_used: this.budgetCalculationsService.calculatePercentage(usedBudget, totalBudget),
      categories: categoryBreakdown,
    };
  }

  async getExpenseByCategory(userId: string, tetConfigId: string) {
    await this.collaboratorsService.checkAccess(userId, tetConfigId);

    const tetConfig = await this.tetConfigRepository.findOne({ where: { id: tetConfigId } });
    if (!tetConfig) throw new NotFoundException('Tet config not found');

    const [usedByCategory, plannedByCategory] = await Promise.all([this.budgetCalculationsService.calculateUsedByCategory(tetConfigId), this.budgetCalculationsService.calculatePlannedByCategory(tetConfigId)]);
    const categories = await this.categoryRepository.find({ where: { tet_config: { id: tetConfigId } } });

    const data = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      color: cat.color,
      icon: cat.icon,
      used: usedByCategory.get(cat.id) ?? 0,
      planned: plannedByCategory.get(cat.id) ?? 0,
    }));

    return { currency: tetConfig.currency, categories: data };
  }

  async getTrend(userId: string, tetConfigId: string, groupBy: 'week' | 'month' = 'week') {
    await this.collaboratorsService.checkAccess(userId, tetConfigId);

    const tetConfig = await this.tetConfigRepository.findOne({ where: { id: tetConfigId } });
    if (!tetConfig) throw new NotFoundException('Tet config not found');

    const dateTrunc = groupBy === 'month' ? 'month' : 'week';
    const rows = await this.todoItemRepository.createQueryBuilder('todo').select(`DATE_TRUNC('${dateTrunc}', todo.created_at)`, 'period').addSelect('COALESCE(SUM(CASE WHEN todo.purchased = true THEN todo.estimated_price * todo.quantity ELSE 0 END), 0)', 'used').addSelect('COALESCE(SUM(todo.estimated_price * todo.quantity), 0)', 'planned').where('todo.tet_config_id = :id', { id: tetConfigId }).andWhere('todo.estimated_price IS NOT NULL').groupBy('period').orderBy('period', 'ASC').getRawMany<{ period: string; used: string; planned: string }>();

    return {
      currency: tetConfig.currency,
      group_by: groupBy,
      data: rows.map((r) => ({ period: r.period, used: parseFloat(r.used), planned: parseFloat(r.planned) })),
    };
  }
}

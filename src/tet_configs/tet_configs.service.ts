import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TetConfig } from './entities/tet_config.entity';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateTetConfigDto } from './dto/create-tet_config.dto';
import { UpdateTetConfigDto } from './dto/update-tet_config.dto';
import { BudgetCalculationsService } from '../helper/budget-calculations.service';

function warningLevel(percentage: number): 'ok' | 'warning' | 'critical' {
  if (percentage >= 100) return 'critical';
  if (percentage >= 80) return 'warning';
  return 'ok';
}

@Injectable()
export class TetConfigsService {
  constructor(
    @InjectRepository(TetConfig)
    private readonly tetConfigRepository: Repository<TetConfig>,
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly budgetCalculationsService: BudgetCalculationsService,
  ) {}

  async create(userId: string, createTetConfigDto: CreateTetConfigDto) {
    const tetConfig = this.tetConfigRepository.create({
      ...createTetConfigDto,
      owner: { id: userId },
    });
    return this.tetConfigRepository.save(tetConfig);
  }

  async findAllByUser(userId: string) {
    return this.tetConfigRepository.find({
      where: { owner: { id: userId } },
    });
  }

  async findOne(id: string) {
    const tetConfig = await this.tetConfigRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!tetConfig) {
      throw new NotFoundException('Tet config not found');
    }
    return tetConfig;
  }

  async update(id: string, updateTetConfigDto: UpdateTetConfigDto) {
    const tetConfig = await this.tetConfigRepository.findOne({ where: { id } });
    if (!tetConfig) {
      throw new NotFoundException('Tet config not found');
    }
    Object.assign(tetConfig, updateTetConfigDto);
    return this.tetConfigRepository.save(tetConfig);
  }

  async updateBudget(id: string, totalBudget: number) {
    const tetConfig = await this.tetConfigRepository.findOne({ where: { id } });
    if (!tetConfig) {
      throw new NotFoundException('Tet config not found');
    }
    tetConfig.total_budget = totalBudget;
    return this.tetConfigRepository.save(tetConfig);
  }

  async getBudgetSummary(id: string) {
    const tetConfig = await this.tetConfigRepository.findOne({ where: { id } });
    if (!tetConfig) throw new NotFoundException('Tet config not found');

    // overall used = sum of purchased items (price x qty)
    const usedBudget = await this.budgetCalculationsService.calculateTotalUsed(id);
    const totalBudget = Number(tetConfig.total_budget);
    const remainingBudget = totalBudget - usedBudget;
    const percentageUsed = this.budgetCalculationsService.calculatePercentage(usedBudget, totalBudget);

    // per category breakdown: allocated vs actually purchased
    const categories = await this.categoryRepository.find({
      where: { tet_config: { id } },
    });

    const usedByCategory = await this.budgetCalculationsService.calculateUsedByCategory(id);

    const categoryBreakdown = categories.map((cat) => {
      const catUsed = usedByCategory.get(cat.id) ?? 0;
      const catAllocated = cat.allocated_budget ? Number(cat.allocated_budget) : null;
      const catRemaining = catAllocated !== null ? catAllocated - catUsed : null;
      const catPercentage = catAllocated && catAllocated > 0 ? this.budgetCalculationsService.calculatePercentage(catUsed, catAllocated) : null;
      return {
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        allocated_budget: catAllocated,
        used_budget: catUsed,
        remaining_budget: catRemaining,
        percentage_used: catPercentage,
        warning_level: catPercentage !== null ? warningLevel(catPercentage) : 'no_limit',
      };
    });

    return {
      total_budget: totalBudget,
      used_budget: usedBudget,
      remaining_budget: remainingBudget,
      percentage_used: percentageUsed,
      warning_level: warningLevel(percentageUsed),
      categories: categoryBreakdown,
    };
  }

  async remove(id: string) {
    const tetConfig = await this.tetConfigRepository.findOne({ where: { id } });
    if (!tetConfig) {
      throw new NotFoundException('Tet config not found');
    }
    await this.tetConfigRepository.softRemove(tetConfig);
    return { message: 'Tet config deleted successfully' };
  }
}

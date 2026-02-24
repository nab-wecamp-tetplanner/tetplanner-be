import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TetConfig } from './entities/tet_config.entity';
import { Category } from '../categories/entities/category.entity';
import { Collaborator } from '../collaborators/entities/collaborator.entity';
import { CreateTetConfigDto } from './dto/create-tet_config.dto';
import { UpdateTetConfigDto } from './dto/update-tet_config.dto';
import { BudgetCalculationsService } from '../helper/budget-calculations.service';
import { CollaboratorStatus } from '../helper/enums';

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
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
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
    const [owned, collabs] = await Promise.all([this.tetConfigRepository.find({ where: { owner: { id: userId } } }), this.collaboratorRepository.find({ where: { user: { id: userId }, status: CollaboratorStatus.ACCEPTED }, relations: ['tet_config'] })]);
    const collaboratedConfigs = collabs.map((c) => c.tet_config);
    const seen = new Set(owned.map((tc) => tc.id));
    return [...owned, ...collaboratedConfigs.filter((tc) => !seen.has(tc.id))];
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
    if (!tetConfig) throw new NotFoundException('Tet config not found');

    const categories = await this.categoryRepository.find({ where: { tet_config: { id } } });
    const alreadyAllocated = categories.reduce((sum, c) => sum + Number(c.allocated_budget ?? 0), 0);
    if (totalBudget < alreadyAllocated) {
      throw new BadRequestException(`New total budget (${totalBudget}) is less than already allocated category budgets (${alreadyAllocated})`);
    }

    tetConfig.total_budget = totalBudget;
    return this.tetConfigRepository.save(tetConfig);
  }

  async getBudgetSummary(id: string) {
    const tetConfig = await this.tetConfigRepository.findOne({ where: { id } });
    if (!tetConfig) throw new NotFoundException('Tet config not found');

    const totalBudget = Number(tetConfig.total_budget);

    const [usedBudget, plannedBudget, usedByCategory, plannedByCategory] = await Promise.all([this.budgetCalculationsService.calculateTotalUsed(id), this.budgetCalculationsService.calculateTotalPlanned(id), this.budgetCalculationsService.calculateUsedByCategory(id), this.budgetCalculationsService.calculatePlannedByCategory(id)]);

    const percentageUsed = this.budgetCalculationsService.calculatePercentage(usedBudget, totalBudget);
    const percentagePlanned = this.budgetCalculationsService.calculatePercentage(plannedBudget, totalBudget);

    // per category breakdown: allocated vs planned vs actually purchased
    const categories = await this.categoryRepository.find({
      where: { tet_config: { id } },
    });

    const categoryBreakdown = categories.map((cat) => {
      const catUsed = usedByCategory.get(cat.id) ?? 0;
      const catPlanned = plannedByCategory.get(cat.id) ?? 0;
      const catAllocated = cat.allocated_budget ? Number(cat.allocated_budget) : null;
      const catRemaining = catAllocated !== null ? catAllocated - catPlanned : null;
      const catPercentagePlanned = catAllocated && catAllocated > 0 ? this.budgetCalculationsService.calculatePercentage(catPlanned, catAllocated) : null;
      const catPercentageUsed = catAllocated && catAllocated > 0 ? this.budgetCalculationsService.calculatePercentage(catUsed, catAllocated) : null;
      return {
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        allocated_budget: catAllocated,
        planned_budget: catPlanned,
        used_budget: catUsed,
        remaining_budget: catRemaining,
        percentage_planned: catPercentagePlanned,
        percentage_used: catPercentageUsed,
        warning_level: catPercentagePlanned !== null ? warningLevel(catPercentagePlanned) : 'no_limit',
      };
    });

    return {
      total_budget: totalBudget,
      planned_budget: plannedBudget,
      used_budget: usedBudget,
      remaining_budget: totalBudget - plannedBudget,
      percentage_planned: percentagePlanned,
      percentage_used: percentageUsed,
      warning_level: warningLevel(percentagePlanned),
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

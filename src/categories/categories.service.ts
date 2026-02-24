import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { BudgetTransaction } from '../budget_transactions/entities/budget_transaction.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CollaboratorsService } from '../collaborators/collaborators.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(TetConfig)
    private readonly tetConfigRepository: Repository<TetConfig>,
    @InjectRepository(BudgetTransaction)
    private readonly transactionRepository: Repository<BudgetTransaction>,
    private readonly collaboratorsService: CollaboratorsService,
  ) {}

  private async getAllocatedSum(tetConfigId: string, excludeCategoryId?: string): Promise<number> {
    const categories = await this.categoryRepository.find({ where: { tet_config: { id: tetConfigId } } });
    return categories.filter((c) => c.id !== excludeCategoryId).reduce((sum, c) => sum + Number(c.allocated_budget ?? 0), 0);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.allocated_budget != null) {
      const tetConfig = await this.tetConfigRepository.findOne({ where: { id: createCategoryDto.tet_config_id } });
      if (!tetConfig) throw new NotFoundException('Tet config not found');
      const alreadyAllocated = await this.getAllocatedSum(createCategoryDto.tet_config_id);
      const newTotal = alreadyAllocated + Number(createCategoryDto.allocated_budget);
      if (newTotal > Number(tetConfig.total_budget)) {
        throw new BadRequestException(`Allocated budgets would exceed total budget. Available to allocate: ${Number(tetConfig.total_budget) - alreadyAllocated}`);
      }
    }
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      tet_config: { id: createCategoryDto.tet_config_id },
    });
    return this.categoryRepository.save(category);
  }

  async findAllByTetConfig(tetConfigId: string) {
    return this.categoryRepository.find({
      where: { tet_config: { id: tetConfigId } },
    });
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id }, relations: ['tet_config'] });
    if (!category) throw new NotFoundException('Category not found');

    if (updateCategoryDto.allocated_budget != null) {
      const tetConfigId = category.tet_config.id;
      const tetConfig = await this.tetConfigRepository.findOne({ where: { id: tetConfigId } });
      if (!tetConfig) throw new NotFoundException('Tet config not found');
      const alreadyAllocated = await this.getAllocatedSum(tetConfigId, id);
      const newTotal = alreadyAllocated + Number(updateCategoryDto.allocated_budget);
      if (newTotal > Number(tetConfig.total_budget)) {
        throw new BadRequestException(`Allocated budgets would exceed total budget. Available to allocate: ${Number(tetConfig.total_budget) - alreadyAllocated}`);
      }
    }

    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryRepository.softRemove(category);
    return { message: 'Category deleted successfully' };
  }

  async findTransactions(userId: string, categoryId: string, from?: string, to?: string, page = 1, limit = 20) {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId }, relations: ['tet_config'] });
    if (!category) throw new NotFoundException('Category not found');
    await this.collaboratorsService.checkAccess(userId, category.tet_config.id);

    const query = this.transactionRepository
      .createQueryBuilder('tx')
      .where('tx.category_id = :categoryId', { categoryId })
      .orderBy('tx.transaction_date', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (from) query.andWhere('tx.transaction_date >= :from', { from: new Date(from) });
    if (to) query.andWhere('tx.transaction_date <= :to', { to: new Date(to) });

    const [data, total] = await query.getManyAndCount();
    return { data, total, page, limit };
  }
}

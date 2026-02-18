import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TetConfig } from './entities/tet_config.entity';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { CreateTetConfigDto } from './dto/create-tet_config.dto';
import { UpdateTetConfigDto } from './dto/update-tet_config.dto';

@Injectable()
export class TetConfigsService {
  constructor(
    @InjectRepository(TetConfig)
    private readonly tetConfigRepository: Repository<TetConfig>,
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
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
    if (!tetConfig) {
      throw new NotFoundException('Tet config not found');
    }

    const result = await this.todoItemRepository.createQueryBuilder('todo').select('COALESCE(SUM(todo.estimated_price * todo.quantity), 0)', 'used_budget').where('todo.tet_config_id = :id', { id }).andWhere('todo.purchased = :purchased', { purchased: true }).getRawOne();

    return {
      total_budget: tetConfig.total_budget,
      used_budget: parseFloat(result.used_budget),
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

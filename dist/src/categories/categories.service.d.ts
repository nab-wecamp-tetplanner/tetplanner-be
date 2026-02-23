import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private readonly categoryRepository;
    private readonly tetConfigRepository;
    constructor(categoryRepository: Repository<Category>, tetConfigRepository: Repository<TetConfig>);
    private getAllocatedSum;
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAllByTetConfig(tetConfigId: string): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

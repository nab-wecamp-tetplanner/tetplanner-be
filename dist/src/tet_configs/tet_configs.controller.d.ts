import { TetConfigsService } from './tet_configs.service';
import { CreateTetConfigDto } from './dto/create-tet_config.dto';
import { UpdateTetConfigDto } from './dto/update-tet_config.dto';
export declare class TetConfigsController {
    private readonly tetConfigsService;
    constructor(tetConfigsService: TetConfigsService);
    create(req: any, createTetConfigDto: CreateTetConfigDto): Promise<import("./entities/tet_config.entity").TetConfig>;
    findAll(req: any): Promise<import("./entities/tet_config.entity").TetConfig[]>;
    getBudgetSummary(id: string): Promise<{
        total_budget: number;
        used_budget: number;
    }>;
    findOne(id: string): Promise<import("./entities/tet_config.entity").TetConfig>;
    updateBudget(id: string, body: {
        total_budget: number;
    }): Promise<import("./entities/tet_config.entity").TetConfig>;
    update(id: string, updateTetConfigDto: UpdateTetConfigDto): Promise<import("./entities/tet_config.entity").TetConfig>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

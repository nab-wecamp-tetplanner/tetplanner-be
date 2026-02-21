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
        remaining_budget: number;
        percentage_used: number;
        warning_level: "ok" | "warning" | "critical";
        categories: {
            id: string;
            name: string;
            icon: string;
            allocated_budget: number | null;
            used_budget: number;
            remaining_budget: number | null;
            percentage_used: number | null;
            warning_level: string;
        }[];
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

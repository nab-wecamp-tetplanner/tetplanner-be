import { DashboardService } from './dashboard.service';
import type { AuthRequest } from '../helper/interfaces/auth-request.interface';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getOverview(req: AuthRequest, tetConfigId: string): Promise<{
        tet_config: {
            id: string;
            name: string;
            year: number;
            currency: string;
        };
        tasks: {
            total: number;
            completed: number;
            pending: number;
            in_progress: number;
            overdue: number;
            completion_rate: number;
            upcoming_deadlines: number;
        };
        shopping: {
            total: number;
            purchased: number;
        };
    }>;
    getBudgetSummary(req: AuthRequest, tetConfigId: string): Promise<{
        currency: string;
        total_budget: number;
        planned_budget: number;
        used_budget: number;
        remaining_budget: number;
        percentage_planned: number;
        percentage_used: number;
        categories: {
            id: string;
            name: string;
            color: string;
            allocated_budget: number | null;
            planned_budget: number;
            used_budget: number;
            remaining_budget: number | null;
        }[];
    }>;
    getExpenseByCategory(req: AuthRequest, tetConfigId: string): Promise<{
        currency: string;
        categories: {
            id: string;
            name: string;
            color: string;
            icon: string;
            used: number;
            planned: number;
        }[];
    }>;
    getTrend(req: AuthRequest, tetConfigId: string, groupBy?: string): Promise<{
        currency: string;
        group_by: "week" | "month";
        data: {
            period: string;
            used: number;
            planned: number;
        }[];
    }>;
}

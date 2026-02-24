import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import type { AuthRequest } from '../helper/interfaces/auth-request.interface';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get task & shopping overview for a tet config' })
  @ApiQuery({ name: 'tet_config_id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Overview returned' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async getOverview(@Req() req: AuthRequest, @Query('tet_config_id') tetConfigId: string) {
    return this.dashboardService.getOverview(req.user.userId, tetConfigId);
  }

  @Get('budget-summary')
  @ApiOperation({ summary: 'Get budget summary for a tet config' })
  @ApiQuery({ name: 'tet_config_id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Budget summary returned' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async getBudgetSummary(@Req() req: AuthRequest, @Query('tet_config_id') tetConfigId: string) {
    return this.dashboardService.getBudgetSummary(req.user.userId, tetConfigId);
  }

  @Get('expense-by-category')
  @ApiOperation({ summary: 'Get expense breakdown by category for a tet config' })
  @ApiQuery({ name: 'tet_config_id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Expense by category returned' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async getExpenseByCategory(@Req() req: AuthRequest, @Query('tet_config_id') tetConfigId: string) {
    return this.dashboardService.getExpenseByCategory(req.user.userId, tetConfigId);
  }

  @Get('trend')
  @ApiOperation({ summary: 'Get spending trend (planned vs used) grouped by week or month' })
  @ApiQuery({ name: 'tet_config_id', required: true, type: String })
  @ApiQuery({ name: 'group_by', required: false, enum: ['week', 'month'], description: 'Grouping period (default: week)' })
  @ApiResponse({ status: 200, description: 'Trend data returned' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async getTrend(@Req() req: AuthRequest, @Query('tet_config_id') tetConfigId: string, @Query('group_by') groupBy?: string) {
    return this.dashboardService.getTrend(req.user.userId, tetConfigId, groupBy === 'month' ? 'month' : 'week');
  }
}

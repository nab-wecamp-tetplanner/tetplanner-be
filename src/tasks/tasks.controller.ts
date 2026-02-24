import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksQueryService } from './tasks-query.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import type { AuthRequest } from '../helper/interfaces/auth-request.interface';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksQueryService: TasksQueryService) {}

  @Get('today')
  @ApiOperation({ summary: 'Get todo items with deadline today' })
  @ApiQuery({ name: 'tet_config_id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Tasks due today returned' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async getToday(@Req() req: AuthRequest, @Query('tet_config_id') tetConfigId: string) {
    return this.tasksQueryService.getToday(req.user.userId, tetConfigId);
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get todo items due in the next 7 days' })
  @ApiQuery({ name: 'tet_config_id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Upcoming tasks returned' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async getUpcoming(@Req() req: AuthRequest, @Query('tet_config_id') tetConfigId: string) {
    return this.tasksQueryService.getUpcoming(req.user.userId, tetConfigId);
  }
}

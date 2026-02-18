import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TetConfigsService } from './tet_configs.service';
import { CreateTetConfigDto } from './dto/create-tet_config.dto';
import { UpdateTetConfigDto } from './dto/update-tet_config.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('tet-configs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tet-configs')
export class TetConfigsController {
  constructor(private readonly tetConfigsService: TetConfigsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tet config (setup budget)' })
  @ApiResponse({ status: 201, description: 'Tet config created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req: any, @Body() createTetConfigDto: CreateTetConfigDto) {
    return this.tetConfigsService.create(req.user.userId, createTetConfigDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tet configs for current user' })
  @ApiResponse({ status: 200, description: 'Tet configs returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Req() req: any) {
    return this.tetConfigsService.findAllByUser(req.user.userId);
  }

  @Get(':id/budget')
  @ApiOperation({ summary: 'Get budget summary (total and used from purchased items)' })
  @ApiResponse({ status: 200, description: 'Budget summary returned' })
  @ApiResponse({ status: 404, description: 'Tet config not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getBudgetSummary(@Param('id') id: string) {
    return this.tetConfigsService.getBudgetSummary(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tet config by ID' })
  @ApiResponse({ status: 200, description: 'Tet config returned' })
  @ApiResponse({ status: 404, description: 'Tet config not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id') id: string) {
    return this.tetConfigsService.findOne(id);
  }

  @Patch(':id/budget')
  @ApiOperation({ summary: 'Update total budget for a tet config' })
  @ApiResponse({ status: 200, description: 'Budget updated successfully' })
  @ApiResponse({ status: 404, description: 'Tet config not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateBudget(@Param('id') id: string, @Body() body: { total_budget: number }) {
    return this.tetConfigsService.updateBudget(id, body.total_budget);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tet config' })
  @ApiResponse({ status: 200, description: 'Tet config updated successfully' })
  @ApiResponse({ status: 404, description: 'Tet config not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(@Param('id') id: string, @Body() updateTetConfigDto: UpdateTetConfigDto) {
    return this.tetConfigsService.update(id, updateTetConfigDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tet config' })
  @ApiResponse({ status: 200, description: 'Tet config deleted successfully' })
  @ApiResponse({ status: 404, description: 'Tet config not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: string) {
    return this.tetConfigsService.remove(id);
  }
}

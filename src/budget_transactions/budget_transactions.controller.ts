import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BudgetTransactionsService } from './budget_transactions.service';
import { CreateBudgetTransactionDto } from './dto/create-budget_transaction.dto';
import { UpdateBudgetTransactionDto } from './dto/update-budget_transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('budget-transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('budget-transactions')
export class BudgetTransactionsController {
  constructor(private readonly budgetTransactionsService: BudgetTransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new budget transaction' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req: any, @Body() createDto: CreateBudgetTransactionDto) {
    return this.budgetTransactionsService.create(req.user.userId, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all budget transactions by tet config' })
  @ApiQuery({ name: 'tet_config_id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Transactions returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Query('tet_config_id') tetConfigId: string) {
    return this.budgetTransactionsService.findAllByTetConfig(tetConfigId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a budget transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction returned' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id') id: string) {
    return this.budgetTransactionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a budget transaction' })
  @ApiResponse({ status: 200, description: 'Transaction updated successfully' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateBudgetTransactionDto) {
    return this.budgetTransactionsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a budget transaction' })
  @ApiResponse({ status: 200, description: 'Transaction deleted successfully' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: string) {
    return this.budgetTransactionsService.remove(id);
  }
}

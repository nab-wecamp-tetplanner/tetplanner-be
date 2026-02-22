import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoItemsService } from './todo_items.service';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
import { UpsertSubtaskDto, RemoveSubtaskDto } from './dto/subtask.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('todo-items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todo-items')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo item' })
  @ApiResponse({ status: 201, description: 'Todo item created successfully' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async create(@Req() req: any, @Body() createDto: CreateTodoItemDto) {
    return this.todoItemsService.create(req.user.userId, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todo items by tet config, optionally filtered by timeline phase' })
  @ApiQuery({ name: 'tet_config_id', required: true, type: String })
  @ApiQuery({ name: 'timeline_phase_id', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Todo items returned' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findAll(@Req() req: any, @Query('tet_config_id') tetConfigId: string, @Query('timeline_phase_id') timelinePhaseId?: string) {
    return this.todoItemsService.findAllByTetConfig(req.user.userId, tetConfigId, timelinePhaseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo item by ID' })
  @ApiResponse({ status: 200, description: 'Todo item returned' })
  @ApiResponse({ status: 404, description: 'Todo item not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findOne(@Req() req: any, @Param('id') id: string) {
    return this.todoItemsService.findOne(req.user.userId, id);
  }

  @Patch(':id/purchase')
  @ApiOperation({ summary: 'Toggle purchased state of a todo item and return updated budget summary' })
  @ApiResponse({
    status: 200,
    description: 'Purchased flag toggled. Returns the updated todo item and the live budget summary for its Tết config.',
    schema: {
      properties: {
        todo_item: { type: 'object' },
        budget: {
          properties: {
            total_budget: { type: 'number' },
            used_budget: { type: 'number' },
            remaining_budget: { type: 'number' },
            percentage_used: { type: 'number', description: '0-100' },
            warning_level: { type: 'string', enum: ['ok', 'warning', 'critical'] },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Todo item not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async togglePurchased(@Req() req: any, @Param('id') id: string) {
    return this.todoItemsService.togglePurchased(req.user.userId as string, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo item' })
  @ApiResponse({ status: 200, description: 'Todo item updated successfully' })
  @ApiResponse({ status: 404, description: 'Todo item not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async update(@Req() req: any, @Param('id') id: string, @Body() updateDto: UpdateTodoItemDto) {
    return this.todoItemsService.update(req.user.userId, id, updateDto);
  }

  @Put(':id/subtasks')
  @ApiOperation({ summary: 'Add or update a subtask (upsert by name)' })
  @ApiResponse({ status: 200, description: 'Subtask upserted' })
  @ApiResponse({ status: 404, description: 'Todo item not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async upsertSubtask(@Req() req: any, @Param('id') id: string, @Body() dto: UpsertSubtaskDto) {
    return this.todoItemsService.upsertSubtask(req.user.userId, id, dto.name, dto.done ?? false);
  }

  @Delete(':id/subtasks')
  @ApiOperation({ summary: 'Remove a subtask by name' })
  @ApiResponse({ status: 200, description: 'Subtask removed' })
  @ApiResponse({ status: 404, description: 'Todo item not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async removeSubtask(@Req() req: any, @Param('id') id: string, @Body() dto: RemoveSubtaskDto) {
    return this.todoItemsService.removeSubtask(req.user.userId, id, dto.name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo item (soft delete)' })
  @ApiResponse({ status: 200, description: 'Todo item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Todo item not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async remove(@Req() req: any, @Param('id') id: string) {
    return this.todoItemsService.remove(req.user.userId, id);
  }
}

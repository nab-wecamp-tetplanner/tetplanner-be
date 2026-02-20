import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoItemsService } from './todo_items.service';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
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
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createTodoItemDto: CreateTodoItemDto) {
    return this.todoItemsService.create(createTodoItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todo items by tet config, optionally filtered by timeline phase' })
  @ApiQuery({ name: 'tet_config_id', required: true, type: String })
  @ApiQuery({ name: 'timeline_phase_id', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Todo items returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Query('tet_config_id') tetConfigId: string, @Query('timeline_phase_id') timelinePhaseId?: string) {
    return this.todoItemsService.findAllByTetConfig(tetConfigId, timelinePhaseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo item by ID' })
  @ApiResponse({ status: 200, description: 'Todo item returned' })
  @ApiResponse({ status: 404, description: 'Todo item not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id') id: string) {
    return this.todoItemsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo item' })
  @ApiResponse({ status: 200, description: 'Todo item updated successfully' })
  @ApiResponse({ status: 404, description: 'Todo item not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(@Param('id') id: string, @Body() updateTodoItemDto: UpdateTodoItemDto) {
    return this.todoItemsService.update(id, updateTodoItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo item (soft delete)' })
  @ApiResponse({ status: 200, description: 'Todo item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Todo item not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: string) {
    return this.todoItemsService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TimelinePhasesService } from './timeline_phases.service';
import { CreateTimelinePhaseDto } from './dto/create-timeline_phase.dto';
import { UpdateTimelinePhaseDto } from './dto/update-timeline_phase.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('timeline-phases')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('timeline-phases')
export class TimelinePhasesController {
  constructor(private readonly timelinePhasesService: TimelinePhasesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a timeline phase for a tet config' })
  @ApiResponse({ status: 201, description: 'Timeline phase created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createTimelinePhaseDto: CreateTimelinePhaseDto) {
    return this.timelinePhasesService.create(createTimelinePhaseDto);
  }

  @Get('tet-config/:tetConfigId')
  @ApiOperation({ summary: 'Get all timeline phases for a tet config' })
  @ApiResponse({ status: 200, description: 'Timeline phases returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAllByTetConfig(@Param('tetConfigId') tetConfigId: string) {
    return this.timelinePhasesService.findAllByTetConfig(tetConfigId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a timeline phase by ID' })
  @ApiResponse({ status: 200, description: 'Timeline phase returned' })
  @ApiResponse({ status: 404, description: 'Timeline phase not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id') id: string) {
    return this.timelinePhasesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a timeline phase' })
  @ApiResponse({ status: 200, description: 'Timeline phase updated successfully' })
  @ApiResponse({ status: 404, description: 'Timeline phase not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(@Param('id') id: string, @Body() updateTimelinePhaseDto: UpdateTimelinePhaseDto) {
    return this.timelinePhasesService.update(id, updateTimelinePhaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a timeline phase' })
  @ApiResponse({ status: 200, description: 'Timeline phase deleted successfully' })
  @ApiResponse({ status: 404, description: 'Timeline phase not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: string) {
    return this.timelinePhasesService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TimelinePhasesService } from './timeline_phases.service';
import { CreateTimelinePhaseDto } from './dto/create-timeline_phase.dto';
import { UpdateTimelinePhaseDto } from './dto/update-timeline_phase.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import type { AuthRequest } from '../helper/interfaces/auth-request.interface';

@ApiTags('timeline-phases')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('timeline-phases')
export class TimelinePhasesController {
  constructor(private readonly timelinePhasesService: TimelinePhasesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a timeline phase for a tet config' })
  @ApiResponse({ status: 201, description: 'Timeline phase created successfully' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async create(@Req() req: AuthRequest, @Body() createDto: CreateTimelinePhaseDto) {
    return this.timelinePhasesService.create(req.user.userId, createDto);
  }

  @Get('tet-config/:tetConfigId')
  @ApiOperation({ summary: 'Get all timeline phases for a tet config' })
  @ApiResponse({ status: 200, description: 'Timeline phases returned' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findAllByTetConfig(@Req() req: AuthRequest, @Param('tetConfigId') tetConfigId: string) {
    return this.timelinePhasesService.findAllByTetConfig(req.user.userId, tetConfigId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a timeline phase by ID' })
  @ApiResponse({ status: 200, description: 'Timeline phase returned' })
  @ApiResponse({ status: 404, description: 'Timeline phase not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findOne(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.timelinePhasesService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a timeline phase' })
  @ApiResponse({ status: 200, description: 'Timeline phase updated successfully' })
  @ApiResponse({ status: 404, description: 'Timeline phase not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async update(@Req() req: AuthRequest, @Param('id') id: string, @Body() updateDto: UpdateTimelinePhaseDto) {
    return this.timelinePhasesService.update(req.user.userId, id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a timeline phase' })
  @ApiResponse({ status: 200, description: 'Timeline phase deleted successfully' })
  @ApiResponse({ status: 404, description: 'Timeline phase not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async remove(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.timelinePhasesService.remove(req.user.userId, id);
  }
}

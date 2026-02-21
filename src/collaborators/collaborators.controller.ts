import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('collaborators')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a collaborator to a tet config (owner only)' })
  @ApiResponse({ status: 201, description: 'Collaborator added' })
  @ApiResponse({ status: 403, description: 'Only owner can add collaborators' })
  @ApiResponse({ status: 409, description: 'User is already a collaborator' })
  async add(@Req() req: any, @Body() createDto: CreateCollaboratorDto) {
    return this.collaboratorsService.add(req.user.userId, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List collaborators of a tet config' })
  @ApiQuery({ name: 'tet_config_id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Collaborators returned' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findAll(@Req() req: any, @Query('tet_config_id') tetConfigId: string) {
    return this.collaboratorsService.findAllByTetConfig(req.user.userId, tetConfigId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update collaborator role (owner only)' })
  @ApiResponse({ status: 200, description: 'Role updated' })
  @ApiResponse({ status: 403, description: 'Only owner can update roles' })
  @ApiResponse({ status: 404, description: 'Collaborator not found' })
  async updateRole(@Param('id') id: string, @Req() req: any, @Body() updateDto: UpdateCollaboratorDto) {
    return this.collaboratorsService.updateRole(id, req.user.userId, updateDto.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a collaborator (owner only)' })
  @ApiResponse({ status: 200, description: 'Collaborator removed' })
  @ApiResponse({ status: 403, description: 'Only owner can remove collaborators' })
  @ApiResponse({ status: 404, description: 'Collaborator not found' })
  async remove(@Param('id') id: string, @Req() req: any) {
    return this.collaboratorsService.remove(id, req.user.userId);
  }
}

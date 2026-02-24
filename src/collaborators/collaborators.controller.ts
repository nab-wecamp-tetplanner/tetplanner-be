import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import type { AuthRequest } from '../helper/interfaces/auth-request.interface';

@ApiTags('collaborators')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a collaborator to a tet config (owner only)' })
  @ApiResponse({ status: 201, description: 'Collaborator added, invitation sent' })
  @ApiResponse({ status: 403, description: 'Only owner can add collaborators' })
  @ApiResponse({ status: 409, description: 'User is already a collaborator' })
  async add(@Req() req: AuthRequest, @Body() createDto: CreateCollaboratorDto) {
    return this.collaboratorsService.add(req.user.userId, createDto);
  }

  @Get('my-invitations')
  @ApiOperation({ summary: 'Get my pending collaboration invitations' })
  @ApiResponse({ status: 200, description: 'Pending invitations returned' })
  async getMyInvitations(@Req() req: AuthRequest) {
    return this.collaboratorsService.getMyInvitations(req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'List collaborators of a tet config' })
  @ApiQuery({ name: 'tet_config_id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Collaborators returned' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findAll(@Req() req: AuthRequest, @Query('tet_config_id') tetConfigId: string) {
    return this.collaboratorsService.findAllByTetConfig(req.user.userId, tetConfigId);
  }

  @Patch(':id/accept')
  @ApiOperation({ summary: 'Accept a collaboration invitation' })
  @ApiResponse({ status: 200, description: 'Invitation accepted' })
  @ApiResponse({ status: 403, description: 'Invitation is not for you' })
  @ApiResponse({ status: 404, description: 'Invitation not found' })
  @ApiResponse({ status: 409, description: 'Invitation is no longer pending' })
  async accept(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.collaboratorsService.accept(id, req.user.userId);
  }

  @Patch(':id/decline')
  @ApiOperation({ summary: 'Decline a collaboration invitation' })
  @ApiResponse({ status: 200, description: 'Invitation declined' })
  @ApiResponse({ status: 403, description: 'Invitation is not for you' })
  @ApiResponse({ status: 404, description: 'Invitation not found' })
  @ApiResponse({ status: 409, description: 'Invitation is no longer pending' })
  async decline(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.collaboratorsService.decline(id, req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update collaborator role (owner only)' })
  @ApiResponse({ status: 200, description: 'Role updated' })
  @ApiResponse({ status: 403, description: 'Only owner can update roles' })
  @ApiResponse({ status: 404, description: 'Collaborator not found' })
  async updateRole(@Param('id') id: string, @Req() req: AuthRequest, @Body() updateDto: UpdateCollaboratorDto) {
    return this.collaboratorsService.updateRole(id, req.user.userId, updateDto.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a collaborator (owner only)' })
  @ApiResponse({ status: 200, description: 'Collaborator removed' })
  @ApiResponse({ status: 403, description: 'Only owner can remove collaborators' })
  @ApiResponse({ status: 404, description: 'Collaborator not found' })
  async remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.collaboratorsService.remove(id, req.user.userId);
  }
}

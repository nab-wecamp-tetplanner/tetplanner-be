import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimelinePhasesService } from './timeline_phases.service';
import { CreateTimelinePhaseDto } from './dto/create-timeline_phase.dto';
import { UpdateTimelinePhaseDto } from './dto/update-timeline_phase.dto';

@Controller('timeline-phases')
export class TimelinePhasesController {
  constructor(private readonly timelinePhasesService: TimelinePhasesService) {}

  @Post()
  create(@Body() createTimelinePhaseDto: CreateTimelinePhaseDto) {
    return this.timelinePhasesService.create(createTimelinePhaseDto);
  }

  @Get()
  findAll() {
    return this.timelinePhasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timelinePhasesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimelinePhaseDto: UpdateTimelinePhaseDto) {
    return this.timelinePhasesService.update(+id, updateTimelinePhaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timelinePhasesService.remove(+id);
  }
}

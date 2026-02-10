import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TetConfigsService } from './tet_configs.service';
import { CreateTetConfigDto } from './dto/create-tet_config.dto';
import { UpdateTetConfigDto } from './dto/update-tet_config.dto';

@Controller('tet-configs')
export class TetConfigsController {
  constructor(private readonly tetConfigsService: TetConfigsService) {}

  @Post()
  create(@Body() createTetConfigDto: CreateTetConfigDto) {
    return this.tetConfigsService.create(createTetConfigDto);
  }

  @Get()
  findAll() {
    return this.tetConfigsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tetConfigsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTetConfigDto: UpdateTetConfigDto) {
    return this.tetConfigsService.update(+id, updateTetConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tetConfigsService.remove(+id);
  }
}

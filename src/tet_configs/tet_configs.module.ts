import { Module } from '@nestjs/common';
import { TetConfigsService } from './tet_configs.service';
import { TetConfigsController } from './tet_configs.controller';

@Module({
  controllers: [TetConfigsController],
  providers: [TetConfigsService],
})
export class TetConfigsModule {}

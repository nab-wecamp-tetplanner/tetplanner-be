import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';
import { Collaborator } from './entities/collaborator.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collaborator, TetConfig])],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService],
  exports: [CollaboratorsService],
})
export class CollaboratorsModule {}

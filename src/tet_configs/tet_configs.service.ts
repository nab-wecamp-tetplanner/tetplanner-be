import { Injectable } from '@nestjs/common';
import { CreateTetConfigDto } from './dto/create-tet_config.dto';
import { UpdateTetConfigDto } from './dto/update-tet_config.dto';

@Injectable()
export class TetConfigsService {
  create(createTetConfigDto: CreateTetConfigDto) {
    return 'This action adds a new tetConfig';
  }

  findAll() {
    return `This action returns all tetConfigs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tetConfig`;
  }

  update(id: number, updateTetConfigDto: UpdateTetConfigDto) {
    return `This action updates a #${id} tetConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} tetConfig`;
  }
}

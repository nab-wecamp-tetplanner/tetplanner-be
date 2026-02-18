import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { SupabaseStorageModule } from '../supabase-storage/supabase-storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SupabaseStorageModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseStorageService } from '../supabase-storage/supabase-storage.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly storageService: SupabaseStorageService,
  ) {}

  async findById(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = user;
    return result;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = user;
    return result;
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const fileName = `${userId}-${Date.now()}-${file.originalname}`;
    const bucketName = process.env.AVATAR_BUCKET_NAME || 'avatars';
    const imageUrl = await this.storageService.uploadImageFromBuffer(file.buffer, fileName, bucketName);

    if (!imageUrl) {
      throw new BadRequestException('Failed to upload avatar');
    }

    user.image_url = imageUrl;
    await this.userRepository.save(user);

    return { message: 'Avatar uploaded successfully', image_url: imageUrl };
  }
}

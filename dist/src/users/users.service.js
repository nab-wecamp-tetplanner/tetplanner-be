"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const supabase_storage_service_1 = require("../supabase-storage/supabase-storage.service");
let UsersService = class UsersService {
    userRepository;
    storageService;
    constructor(userRepository, storageService) {
        this.userRepository = userRepository;
        this.storageService = storageService;
    }
    async findById(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password_hash, ...result } = user;
        return result;
    }
    async update(userId, updateUserDto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        Object.assign(user, updateUserDto);
        await this.userRepository.save(user);
        const { password_hash, ...result } = user;
        return result;
    }
    async uploadAvatar(userId, file) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const fileName = `${userId}-${Date.now()}-${file.originalname}`;
        const bucketName = process.env.AVATAR_BUCKET_NAME || 'avatars';
        const imageUrl = await this.storageService.uploadImageFromBuffer(file.buffer, fileName, bucketName);
        if (!imageUrl) {
            throw new common_1.BadRequestException('Failed to upload avatar');
        }
        user.image_url = imageUrl;
        await this.userRepository.save(user);
        return { message: 'Avatar uploaded successfully', image_url: imageUrl };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        supabase_storage_service_1.SupabaseStorageService])
], UsersService);
//# sourceMappingURL=users.service.js.map
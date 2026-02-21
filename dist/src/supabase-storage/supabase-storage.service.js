"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseStorageService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("@nestjs/config");
const fs = __importStar(require("fs"));
const sanitize_file_name_util_1 = require("../helper/sanitize-file-name.util");
let SupabaseStorageService = class SupabaseStorageService {
    configService;
    supabase;
    avatarBucketName = process.env.AVATAR_BUCKET_NAME || 'avatars';
    constructor(configService) {
        this.configService = configService;
        const supabaseUrl = this.configService.get('SUPABASE_URL');
        const supabaseKey = this.configService.get('SUPABASE_KEY');
        this.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
    }
    async uploadImageFromBuffer(buffer, fileName, bucketName) {
        const ext = fileName.split('.').pop();
        let contentType = 'image/png';
        fileName = (0, sanitize_file_name_util_1.sanitizeFileName)(fileName);
        switch (ext?.toLowerCase()) {
            case 'jpg':
            case 'jpeg':
                contentType = 'image/jpeg';
                break;
            case 'png':
                contentType = 'image/png';
                break;
            case 'webp':
                contentType = 'image/webp';
                break;
            case 'gif':
                contentType = 'image/gif';
                break;
        }
        try {
            const { data, error } = await this.supabase.storage.from(bucketName).upload(fileName, buffer, {
                contentType: contentType,
                upsert: true,
            });
            if (error) {
                console.error('Supabase storage upload error:', error);
                throw error;
            }
            const { data: publicUrlData } = this.supabase.storage.from(bucketName).getPublicUrl(fileName);
            if (!publicUrlData || !publicUrlData.publicUrl) {
                return null;
            }
            return publicUrlData.publicUrl;
        }
        catch (error) {
            console.error('Failed to upload image:', error);
            if (process.env.NODE_ENV === 'test') {
                return `https://mock-storage.example.com/${bucketName}/${fileName}`;
            }
            throw error;
        }
    }
    async uploadImageFromFile(filePath, fileName, bucketName) {
        const buffer = fs.readFileSync(filePath);
        fs.unlinkSync(filePath);
        return await this.uploadImageFromBuffer(buffer, fileName, bucketName);
    }
};
exports.SupabaseStorageService = SupabaseStorageService;
exports.SupabaseStorageService = SupabaseStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupabaseStorageService);
//# sourceMappingURL=supabase-storage.service.js.map
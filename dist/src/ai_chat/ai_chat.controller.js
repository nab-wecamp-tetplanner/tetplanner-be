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
exports.AiChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ai_chat_service_1 = require("./ai_chat.service");
const chat_dto_1 = require("./dto/chat.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let AiChatController = class AiChatController {
    aiChatService;
    constructor(aiChatService) {
        this.aiChatService = aiChatService;
    }
    async chat(dto) {
        return this.aiChatService.chat(dto);
    }
};
exports.AiChatController = AiChatController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Chat with AI assistant', description: 'Send a message with optional history to the AI assistant.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'AI reply returned' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.ChatDto]),
    __metadata("design:returntype", Promise)
], AiChatController.prototype, "chat", null);
exports.AiChatController = AiChatController = __decorate([
    (0, swagger_1.ApiTags)('ai-chat'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('ai-chat'),
    __metadata("design:paramtypes", [ai_chat_service_1.AiChatService])
], AiChatController);
//# sourceMappingURL=ai_chat.controller.js.map
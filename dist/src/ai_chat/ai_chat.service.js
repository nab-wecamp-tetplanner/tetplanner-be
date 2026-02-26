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
var AiChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiChatService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const generative_ai_1 = require("@google/generative-ai");
let AiChatService = AiChatService_1 = class AiChatService {
    configService;
    logger = new common_1.Logger(AiChatService_1.name);
    genAI;
    modelName;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('GEMINI_API_KEY') ?? '';
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        this.modelName = this.configService.get('GEMINI_MODEL') ?? 'gemini-2.5-flash';
        this.logger.log(`Using Gemini model: ${this.modelName}`);
    }
    async chat(dto) {
        const model = this.genAI.getGenerativeModel({ model: this.modelName });
        const history = (dto.history ?? []).map((h) => ({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content }],
        }));
        const chatSession = model.startChat({ history });
        const result = await chatSession.sendMessage(dto.message);
        const reply = result.response.text();
        return { reply };
    }
};
exports.AiChatService = AiChatService;
exports.AiChatService = AiChatService = AiChatService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AiChatService);
//# sourceMappingURL=ai_chat.service.js.map
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
var AiChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiChatService = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const generative_ai_1 = require("@google/generative-ai");
let AiChatService = AiChatService_1 = class AiChatService {
    configService;
    logger = new common_1.Logger(AiChatService_1.name);
    genAI;
    modelName;
    systemInstruction;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('GEMINI_API_KEY') ?? '';
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        this.modelName = this.configService.get('GEMINI_MODEL') ?? 'gemini-2.5-flash';
        this.systemInstruction = this.loadSystemPrompt();
        this.logger.log(`Using Gemini model: ${this.modelName}`);
    }
    loadSystemPrompt() {
        try {
            const promptPath = path.join(__dirname, 'prompt', 'project_prompt.json');
            const promptData = JSON.parse(fs.readFileSync(promptPath, 'utf-8'));
            return promptData.system_instruction;
        }
        catch {
            this.logger.warn('Could not load project_prompt.json — using fallback system instruction');
            return 'You are TetBot 🤖🧧, a funny and helpful Tet planning assistant. Help users plan their Vietnamese Lunar New Year celebration, manage their budget wisely, and complete their tasks on time. Use emojis and be warm and fun! 🎆';
        }
    }
    async chat(dto) {
        const model = this.genAI.getGenerativeModel({
            model: this.modelName,
            systemInstruction: this.systemInstruction,
            generationConfig: {
                maxOutputTokens: 800,
            },
        });
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
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaboratorsService = void 0;
const common_1 = require("@nestjs/common");
let CollaboratorsService = class CollaboratorsService {
    create(createCollaboratorDto) {
        return 'This action adds a new collaborator';
    }
    findAll() {
        return `This action returns all collaborators`;
    }
    findOne(id) {
        return `This action returns a #${id} collaborator`;
    }
    update(id, updateCollaboratorDto) {
        return `This action updates a #${id} collaborator`;
    }
    remove(id) {
        return `This action removes a #${id} collaborator`;
    }
};
exports.CollaboratorsService = CollaboratorsService;
exports.CollaboratorsService = CollaboratorsService = __decorate([
    (0, common_1.Injectable)()
], CollaboratorsService);
//# sourceMappingURL=collaborators.service.js.map
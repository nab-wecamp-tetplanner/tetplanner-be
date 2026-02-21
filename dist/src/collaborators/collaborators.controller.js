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
exports.CollaboratorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const collaborators_service_1 = require("./collaborators.service");
const create_collaborator_dto_1 = require("./dto/create-collaborator.dto");
const update_collaborator_dto_1 = require("./dto/update-collaborator.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let CollaboratorsController = class CollaboratorsController {
    collaboratorsService;
    constructor(collaboratorsService) {
        this.collaboratorsService = collaboratorsService;
    }
    async add(req, createDto) {
        return this.collaboratorsService.add(req.user.userId, createDto);
    }
    async findAll(req, tetConfigId) {
        return this.collaboratorsService.findAllByTetConfig(req.user.userId, tetConfigId);
    }
    async updateRole(id, req, updateDto) {
        return this.collaboratorsService.updateRole(id, req.user.userId, updateDto.role);
    }
    async remove(id, req) {
        return this.collaboratorsService.remove(id, req.user.userId);
    }
};
exports.CollaboratorsController = CollaboratorsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a collaborator to a tet config (owner only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Collaborator added' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Only owner can add collaborators' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User is already a collaborator' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_collaborator_dto_1.CreateCollaboratorDto]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "add", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List collaborators of a tet config' }),
    (0, swagger_1.ApiQuery)({ name: 'tet_config_id', required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Collaborators returned' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('tet_config_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update collaborator role (owner only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Role updated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Only owner can update roles' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Collaborator not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_collaborator_dto_1.UpdateCollaboratorDto]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a collaborator (owner only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Collaborator removed' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Only owner can remove collaborators' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Collaborator not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "remove", null);
exports.CollaboratorsController = CollaboratorsController = __decorate([
    (0, swagger_1.ApiTags)('collaborators'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('collaborators'),
    __metadata("design:paramtypes", [collaborators_service_1.CollaboratorsService])
], CollaboratorsController);
//# sourceMappingURL=collaborators.controller.js.map
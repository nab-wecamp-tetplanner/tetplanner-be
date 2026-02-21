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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTimelinePhaseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateTimelinePhaseDto {
    name;
    start_date;
    end_date;
    display_order;
    tet_config_id;
}
exports.CreateTimelinePhaseDto = CreateTimelinePhaseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Phase name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTimelinePhaseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, description: 'Start date' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => (value instanceof Date ? value.toISOString() : value)),
    __metadata("design:type", Date)
], CreateTimelinePhaseDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, description: 'End date' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => (value instanceof Date ? value.toISOString() : value)),
    __metadata("design:type", Date)
], CreateTimelinePhaseDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Display order' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateTimelinePhaseDto.prototype, "display_order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Tet config ID' }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTimelinePhaseDto.prototype, "tet_config_id", void 0);
//# sourceMappingURL=create-timeline_phase.dto.js.map
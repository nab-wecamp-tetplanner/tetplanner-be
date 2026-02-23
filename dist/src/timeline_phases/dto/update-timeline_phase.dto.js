"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTimelinePhaseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_timeline_phase_dto_1 = require("./create-timeline_phase.dto");
class UpdateTimelinePhaseDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_timeline_phase_dto_1.CreateTimelinePhaseDto, ['tet_config_id'])) {
}
exports.UpdateTimelinePhaseDto = UpdateTimelinePhaseDto;
//# sourceMappingURL=update-timeline_phase.dto.js.map
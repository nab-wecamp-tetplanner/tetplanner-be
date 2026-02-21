"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeFileName = sanitizeFileName;
function sanitizeFileName(title) {
    const sanitized = title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9-_ ]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();
    return `${sanitized}-${Date.now()}.jpg`;
}
//# sourceMappingURL=sanitize-file-name.util.js.map
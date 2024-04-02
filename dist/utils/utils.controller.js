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
exports.UtilsController = void 0;
const common_1 = require("@nestjs/common");
const utils_service_1 = require("./utils.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const fs = require("fs");
let UtilsController = class UtilsController {
    constructor(utilsService) {
        this.utilsService = utilsService;
    }
    async sendWhatsappFile(body) {
        return await this.utilsService.sendWhatsappFile(body);
    }
    async uploadFiles(files) {
        const paths = files.map((it) => it.path);
        const array = await this.utilsService.liqPrimGranos(paths);
        paths.forEach((path) => {
        });
        return array;
    }
};
__decorate([
    (0, common_1.Post)('sendWhatsappFile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "sendWhatsappFile", null);
__decorate([
    (0, common_1.Post)('liquidacionPrimariaGranos'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const path = `./tmp`;
                fs.mkdirSync(path, { recursive: true });
                return cb(null, path);
            },
            filename: (req, file, callback) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "uploadFiles", null);
UtilsController = __decorate([
    (0, common_1.Controller)('utils'),
    __metadata("design:paramtypes", [utils_service_1.UtilsService])
], UtilsController);
exports.UtilsController = UtilsController;
//# sourceMappingURL=utils.controller.js.map
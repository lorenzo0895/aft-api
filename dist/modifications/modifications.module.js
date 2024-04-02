"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificationsModule = void 0;
const common_1 = require("@nestjs/common");
const modifications_service_1 = require("./modifications.service");
const modifications_controller_1 = require("./modifications.controller");
let ModificationsModule = class ModificationsModule {
};
ModificationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [modifications_controller_1.ModificationsController],
        providers: [modifications_service_1.ModificationsService],
    })
], ModificationsModule);
exports.ModificationsModule = ModificationsModule;
//# sourceMappingURL=modifications.module.js.map
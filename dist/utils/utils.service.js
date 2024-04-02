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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
const path = require('path');
const common_1 = require("@nestjs/common");
const whatsapp_web_js_1 = require("whatsapp-web.js");
const child_process_1 = require("child_process");
let UtilsService = class UtilsService {
    constructor() {
        this.wppClient = new whatsapp_web_js_1.Client({
            authStrategy: new whatsapp_web_js_1.LocalAuth({ clientId: 'id-1' }),
        });
    }
    async sendWhatsappFile(body) {
        if (!body || !body.number) {
            throw new common_1.BadRequestException('El número no puede ser nulo');
        }
        await this.wppClient.sendMessage(body.number + '@c.us', 'Hola');
        return { status: 'ok' };
    }
    async liqPrimGranos(pdfs) {
        var _a, e_1, _b, _c;
        const script = (0, child_process_1.spawn)('python', [
            './assets/python/liqPrimGranos.py',
            ...pdfs,
        ]);
        script.on('error', (error) => {
            console.error(`Error al ejecutar el script en python: ${error.message}`);
        });
        let result = '';
        try {
            for (var _d = true, _e = __asyncValues(script.stdout), _f; _f = await _e.next(), _a = _f.done, !_a;) {
                _c = _f.value;
                _d = false;
                try {
                    const chunk = _c;
                    result += chunk;
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        result = result.replace(/'/g, '"');
        return JSON.parse(result);
    }
};
UtilsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UtilsService);
exports.UtilsService = UtilsService;
//# sourceMappingURL=utils.service.js.map
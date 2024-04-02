"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 92:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillingsService = void 0;
const common_1 = __webpack_require__(7);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(13);
const billing_entity_1 = __webpack_require__(93);
const path_1 = __webpack_require__(80);
const general_configs_service_1 = __webpack_require__(88);
const Afip = __webpack_require__(94);
let BillingsService = class BillingsService {
    constructor(billingRepository, generalConfigsService, dataSource) {
        this.billingRepository = billingRepository;
        this.generalConfigsService = generalConfigsService;
        this.dataSource = dataSource;
    }
    async generateAfipObject() {
        const cuit = await this.generalConfigsService.findOne('cuit');
        if (!cuit)
            throw new common_1.NotFoundException();
        try {
            return new Afip({
                CUIT: cuit.value,
                cert: (0, path_1.join)(__dirname, "assets", "afip-certs", "cert"),
                key: (0, path_1.join)(__dirname, "assets", "afip-certs", "key"),
                production: false,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Los certificados de AFIP son inválidos');
        }
    }
    async create(createBillingDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const createdVouchers = [];
            for (const voucher of createBillingDto.vouchers) {
                const newVoucher = queryRunner.manager.create(billing_entity_1.Billing, voucher);
                const a = await queryRunner.manager.save(newVoucher);
                createdVouchers.push(a);
            }
            await queryRunner.commitTransaction();
            return createdVouchers;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            if (err instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(err.message);
            }
            else {
                throw new common_1.BadRequestException("Algo falló");
            }
        }
        finally {
            await queryRunner.release();
        }
    }
    async generateCAE(createBillingDto) {
        const result = {
            success: {},
            error: {},
        };
        for (const voucher of createBillingDto.vouchers) {
            try {
                const a = await this._createVoucher(voucher);
                result.success[voucher.id] = a;
                await this.billingRepository.delete({ id: voucher.id });
            }
            catch (err) {
                result.error[voucher.id] = err.message;
            }
        }
        return result;
    }
    async findBySalePoint(salePoint) {
        return await this.billingRepository.findBy({ salePoint });
    }
    async getLastInvoices(config) {
        const afip = await this.generateAfipObject();
        const last = await afip.ElectronicBilling.getLastVoucher(1, 1);
        return await this._getVouchersInfo({
            salePoint: config.salePoint,
            type: 1,
            to: last,
            limit: config.limit,
        });
    }
    async _getVouchersInfo(config) {
        const array = [];
        const limitFrom = config.to - config.limit + 1;
        const from = 1 < limitFrom ? limitFrom : 1;
        for (let i = from; i <= config.to; i++) {
            try {
                array.push(await this._getVoucherInfo(i, config.salePoint, config.type));
            }
            catch (error) { }
        }
        return array;
    }
    async _getVoucherInfo(voucherNumber, salePoint, type) {
        const afip = await this.generateAfipObject();
        return await afip.ElectronicBilling.getVoucherInfo(voucherNumber, salePoint, type);
    }
    async _createVoucher(generateCae) {
        const salePoint = 2;
        const voucherType = 1;
        const afip = await this.generateAfipObject();
        const last = await afip.ElectronicBilling.getLastVoucher(salePoint, voucherType);
        const number = (last !== null && last !== void 0 ? last : 0) + 1;
        const date = generateCae.date.replace(/-/g, '');
        const fechaServicioDesde = generateCae.dateFrom.replace(/-/g, '');
        const fechaServicioHasta = generateCae.dateTo.replace(/-/g, '');
        const fechaVencimientoPago = generateCae.datePayment.replace(/-/g, '');
        const data = {
            CantReg: 1,
            PtoVta: salePoint,
            CbteTipo: 1,
            Concepto: 2,
            DocTipo: 80,
            DocNro: generateCae.cuit,
            CbteDesde: number,
            CbteHasta: number,
            CbteFch: date,
            FchServDesde: fechaServicioDesde,
            FchServHasta: fechaServicioHasta,
            FchVtoPago: fechaVencimientoPago,
            ImpTotal: generateCae.net + generateCae.vat,
            ImpTotConc: 0,
            ImpNeto: generateCae.net,
            ImpOpEx: 0,
            ImpIVA: generateCae.vat,
            ImpTrib: 0,
            MonId: "PES",
            MonCotiz: 1,
            Iva: [
                {
                    Id: 5,
                    BaseImp: generateCae.net,
                    Importe: generateCae.vat,
                }
            ],
        };
        const res = await afip.ElectronicBilling.createVoucher(data);
        return res;
    }
    async remove(ids) {
        const result = {
            success: [],
            error: [],
        };
        for (const id of ids) {
            try {
                const day = await this.billingRepository.delete({ id: id });
                if (day.affected === 0)
                    throw new Error('Factura no encontrada');
                result.success.push(id);
            }
            catch (error) {
                result.error.push(id);
            }
        }
        return result;
    }
};
BillingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(billing_entity_1.Billing)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof general_configs_service_1.GeneralConfigsService !== "undefined" && general_configs_service_1.GeneralConfigsService) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _c : Object])
], BillingsService);
exports.BillingsService = BillingsService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8f7d456f03034b4b723d")
/******/ })();
/******/ 
/******/ }
;
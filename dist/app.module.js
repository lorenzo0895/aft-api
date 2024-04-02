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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const clients_module_1 = require("./clients/clients.module");
const typeorm_1 = require("@nestjs/typeorm");
const client_entity_1 = require("./clients/entities/client.entity");
const concepts_module_1 = require("./concepts/concepts.module");
const concept_entity_1 = require("./concepts/entities/concept.entity");
const receipts_module_1 = require("./receipts/receipts.module");
const users_module_1 = require("./users/users.module");
const cheques_module_1 = require("./cheques/cheques.module");
const modifications_module_1 = require("./modifications/modifications.module");
const user_entity_1 = require("./users/entities/user.entity");
const cheque_entity_1 = require("./cheques/entities/cheque.entity");
const days_module_1 = require("./days/days.module");
const day_entity_1 = require("./days/entities/day.entity");
const receipt_entity_1 = require("./receipts/entities/receipt.entity");
const auth_module_1 = require("./auth/auth.module");
const concept_entity_2 = require("./concept-items/entities/concept.entity");
const concept_items_module_1 = require("./concept-items/concept-items.module");
const typeorm_2 = require("typeorm");
const utils_module_1 = require("./utils/utils.module");
const general_configs_module_1 = require("./general-configs/general-configs.module");
const general_config_entity_1 = require("./general-configs/entities/general-config.entity");
const billings_module_1 = require("./billings/billings.module");
const billing_entity_1 = require("./billings/entities/billing.entity");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "root",
                database: "estudio",
                entities: [
                    client_entity_1.Client,
                    concept_entity_1.Concept,
                    user_entity_1.User,
                    cheque_entity_1.Cheque,
                    day_entity_1.Day,
                    receipt_entity_1.Receipt,
                    concept_entity_2.ConceptItem,
                    general_config_entity_1.GeneralConfig,
                    billing_entity_1.Billing,
                ],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            cheques_module_1.ChequesModule,
            clients_module_1.ClientsModule,
            concepts_module_1.ConceptsModule,
            concept_items_module_1.ConceptItemsModule,
            days_module_1.DaysModule,
            modifications_module_1.ModificationsModule,
            receipts_module_1.ReceiptsModule,
            users_module_1.UsersModule,
            utils_module_1.UtilsModule,
            general_configs_module_1.GeneralConfigsModule,
            billings_module_1.BillingsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
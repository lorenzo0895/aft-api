import { DataSource, Repository } from "typeorm";
import { Billing } from "./entities/billing.entity";
import { GetVouchersInfoConfig } from "./dto/get-last-vouchers.dto";
import { ImportVouchers } from "./dto/create-billing.dto";
import { GenerateCaeGroup } from "./dto/generate-cae.dto";
import { GeneralConfigsService } from "src/general-configs/general-configs.service";
export declare class BillingsService {
    private billingRepository;
    private generalConfigsService;
    private dataSource;
    constructor(billingRepository: Repository<Billing>, generalConfigsService: GeneralConfigsService, dataSource: DataSource);
    generateAfipObject(): Promise<any>;
    create(createBillingDto: ImportVouchers): Promise<any[]>;
    generateCAE(createBillingDto: GenerateCaeGroup): Promise<{
        success: {};
        error: {};
    }>;
    findBySalePoint(salePoint: number): Promise<Billing[]>;
    getLastInvoices(config: GetVouchersInfoConfig): Promise<any[]>;
    private _getVouchersInfo;
    private _getVoucherInfo;
    private _createVoucher;
    remove(ids: number[]): Promise<{
        success: any[];
        error: any[];
    }>;
}

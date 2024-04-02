import { BillingsService } from './billings.service';
import { GetVouchersInfoConfig } from './dto/get-last-vouchers.dto';
import { ImportVouchers } from './dto/create-billing.dto';
import { GenerateCaeGroup } from './dto/generate-cae.dto';
export declare class BillingsController {
    private readonly billingsService;
    constructor(billingsService: BillingsService);
    findBySalePoint(salePoint: number): Promise<import("./entities/billing.entity").Billing[]>;
    create(createBillingDto: ImportVouchers): Promise<any[]>;
    generateCAE(createBillingDto: GenerateCaeGroup): Promise<{
        success: {};
        error: {};
    }>;
    getInvoices(body: GetVouchersInfoConfig): Promise<any[]>;
    remove(body: {
        ids: number[];
    }): Promise<{
        success: any[];
        error: any[];
    }>;
}

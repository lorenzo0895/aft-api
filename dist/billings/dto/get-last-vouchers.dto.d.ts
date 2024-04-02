export interface GetVouchersInfoConfig {
    salePoint: number;
    type: number;
    limit: number;
}
export interface GetVouchersInfoConfigInternal extends GetVouchersInfoConfig {
    to: number;
}

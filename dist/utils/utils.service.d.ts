export declare class UtilsService {
    private _isAuthenticated;
    private _qr;
    private wppClient;
    constructor();
    sendWhatsappFile(body: {
        number: string;
    }): Promise<{
        status: string;
    }>;
    liqPrimGranos(pdfs: string[]): Promise<any>;
}

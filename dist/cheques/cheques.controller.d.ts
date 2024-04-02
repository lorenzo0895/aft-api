import { ChequesService } from './cheques.service';
import { CreateChequeDto } from './dto/create-cheque.dto';
import { UpdateChequeDto } from './dto/update-cheque.dto';
export declare class ChequesController {
    private readonly chequesService;
    constructor(chequesService: ChequesService);
    findAll(onlyActive?: boolean): Promise<import("./entities/cheque.entity").Cheque[]>;
    findOne(id: string): Promise<import("./entities/cheque.entity").Cheque>;
    create(createChequeDto: CreateChequeDto): Promise<import("./entities/cheque.entity").Cheque>;
    update(id: string, updateChequeDto: UpdateChequeDto): Promise<import("./entities/cheque.entity").Cheque>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

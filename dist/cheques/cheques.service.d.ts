import { Repository } from 'typeorm';
import { CreateChequeDto } from './dto/create-cheque.dto';
import { UpdateChequeDto } from './dto/update-cheque.dto';
import { Cheque } from './entities/cheque.entity';
export declare class ChequesService {
    private chequeRepository;
    constructor(chequeRepository: Repository<Cheque>);
    create(CreateChequeDto: CreateChequeDto): Promise<Cheque>;
    findAll(onlyActive: boolean): Promise<Cheque[]>;
    findOne(id: number): Promise<Cheque>;
    update(id: number, updateChequeDto: UpdateChequeDto): Promise<Cheque>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}

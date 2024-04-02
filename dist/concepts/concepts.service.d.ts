import { Repository } from 'typeorm';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';
import { Concept } from './entities/concept.entity';
export declare class ConceptsService {
    private conceptRepository;
    constructor(conceptRepository: Repository<Concept>);
    findAll(): Promise<Concept[]>;
    findOne(id: number): Promise<Concept>;
    create(createConceptDto: CreateConceptDto): Promise<Concept>;
    update(id: number, updateConceptDto: UpdateConceptDto): Promise<Concept>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}

import { ConceptsService } from './concepts.service';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';
export declare class ConceptsController {
    private readonly conceptsService;
    constructor(conceptsService: ConceptsService);
    create(createConceptDto: CreateConceptDto): Promise<import("./entities/concept.entity").Concept>;
    findAll(): Promise<import("./entities/concept.entity").Concept[]>;
    findOne(id: string): Promise<import("./entities/concept.entity").Concept>;
    update(id: string, updateConceptDto: UpdateConceptDto): Promise<import("./entities/concept.entity").Concept>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

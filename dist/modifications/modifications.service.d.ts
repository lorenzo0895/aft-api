import { CreateModificationDto } from './dto/create-modification.dto';
import { UpdateModificationDto } from './dto/update-modification.dto';
export declare class ModificationsService {
    create(createModificationDto: CreateModificationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateModificationDto: UpdateModificationDto): string;
    remove(id: number): string;
}

import { Repository } from 'typeorm';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { Day } from './entities/day.entity';
export declare class DaysService {
    private dayRepository;
    constructor(dayRepository: Repository<Day>);
    create(createDayDto: CreateDayDto): Promise<Day>;
    findAll(full: boolean, onlyActive?: boolean): Promise<any>;
    findOne(id: number): Promise<Day>;
    update(id: number, updateDayDto: UpdateDayDto): Promise<Day>;
    close(id: number): Promise<Day>;
    open(id: number): Promise<Day>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}

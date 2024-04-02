import { DaysService } from './days.service';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
export declare class DaysController {
    private readonly daysService;
    constructor(daysService: DaysService);
    findAll(full?: boolean, onlyActive?: boolean): Promise<any>;
    findOne(id: string): Promise<import("./entities/day.entity").Day>;
    create(createDayDto: CreateDayDto): Promise<import("./entities/day.entity").Day>;
    update(id: string, updateDayDto: UpdateDayDto): Promise<import("./entities/day.entity").Day>;
    close(id: string): Promise<import("./entities/day.entity").Day>;
    open(id: string): Promise<import("./entities/day.entity").Day>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

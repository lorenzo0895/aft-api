import { DayDto } from './day.dto';
declare const CreateDayDto_base: import("@nestjs/common").Type<Omit<DayDto, "id" | "isActive" | "totalAudited" | "leftover">>;
export declare class CreateDayDto extends CreateDayDto_base {
}
export {};

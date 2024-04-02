import { UserDto } from './user.dto';
declare const CreateUserDto_base: import("@nestjs/common").Type<Omit<UserDto, "id" | "isActive" | "receipts">>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export {};

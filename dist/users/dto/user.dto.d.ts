import { Receipt } from 'src/receipts/entities/receipt.entity';
export declare class UserDto {
    id: number;
    name: string;
    surname: string;
    username: string;
    password: string;
    email: string;
    receipts: Receipt[];
    roles: string;
    isActive: boolean;
}

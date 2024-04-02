import { Cheque } from 'src/cheques/entities/cheque.entity';
import { ClientDto } from 'src/clients/dto/client.dto';
import { DayDto } from 'src/days/dto/day.dto';
import { User } from 'src/users/entities/user.entity';
export declare class ReceiptDto {
    id: number;
    day: DayDto;
    client: ClientDto;
    transferAmount: number;
    cash: number;
    user: User;
    description: string;
    cheques: Cheque[];
    isActive: boolean;
    isCanceled: boolean;
    cancelReceipt: ReceiptDto;
}

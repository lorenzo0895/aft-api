import { Cheque } from 'src/cheques/entities/cheque.entity';
import { Client } from 'src/clients/entities/client.entity';
import { ConceptItem } from 'src/concept-items/entities/concept.entity';
import { Day } from 'src/days/entities/day.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Receipt {
    id: number;
    number: number;
    day: Day;
    client: Client;
    transferAmount: number;
    description: string;
    cash: number;
    cheques: Cheque[];
    cancelCheques: Cheque[];
    conceptItems: ConceptItem[];
    user: User;
    cancelReceipt: Receipt;
    isActive: boolean;
    isCancelled: boolean;
}

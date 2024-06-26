import { ConceptItemService } from './concept-items.service';
import { CreateConceptItemDto } from './dto/create-concept-item.dto';
import { UpdateConceptItemDto } from './dto/update-concept-item.dto';
export declare class ConceptItemController {
    private readonly conceptsService;
    constructor(conceptsService: ConceptItemService);
    create(createConceptDto: CreateConceptItemDto): Promise<{
        concept: import("../concepts/entities/concept.entity").Concept;
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): import("./entities/concept.entity").ConceptItem;
        push(...items: import("./entities/concept.entity").ConceptItem[]): number;
        concat(...items: ConcatArray<import("./entities/concept.entity").ConceptItem>[]): import("./entities/concept.entity").ConceptItem[];
        concat(...items: (import("./entities/concept.entity").ConceptItem | ConcatArray<import("./entities/concept.entity").ConceptItem>)[]): import("./entities/concept.entity").ConceptItem[];
        join(separator?: string): string;
        reverse(): import("./entities/concept.entity").ConceptItem[];
        shift(): import("./entities/concept.entity").ConceptItem;
        slice(start?: number, end?: number): import("./entities/concept.entity").ConceptItem[];
        sort(compareFn?: (a: import("./entities/concept.entity").ConceptItem, b: import("./entities/concept.entity").ConceptItem) => number): import("./entities/concept.entity").ConceptItem[];
        splice(start: number, deleteCount?: number): import("./entities/concept.entity").ConceptItem[];
        splice(start: number, deleteCount: number, ...items: import("./entities/concept.entity").ConceptItem[]): import("./entities/concept.entity").ConceptItem[];
        unshift(...items: import("./entities/concept.entity").ConceptItem[]): number;
        indexOf(searchElement: import("./entities/concept.entity").ConceptItem, fromIndex?: number): number;
        lastIndexOf(searchElement: import("./entities/concept.entity").ConceptItem, fromIndex?: number): number;
        every<S extends import("./entities/concept.entity").ConceptItem>(predicate: (value: import("./entities/concept.entity").ConceptItem, index: number, array: import("./entities/concept.entity").ConceptItem[]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: import("./entities/concept.entity").ConceptItem, index: number, array: import("./entities/concept.entity").ConceptItem[]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: import("./entities/concept.entity").ConceptItem, index: number, array: import("./entities/concept.entity").ConceptItem[]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: import("./entities/concept.entity").ConceptItem, index: number, array: import("./entities/concept.entity").ConceptItem[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: import("./entities/concept.entity").ConceptItem, index: number, array: import("./entities/concept.entity").ConceptItem[]) => U, thisArg?: any): U[];
        filter<S_1 extends import("./entities/concept.entity").ConceptItem>(predicate: (value: import("./entities/concept.entity").ConceptItem, index: number, array: import("./entities/concept.entity").ConceptItem[]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: import("./entities/concept.entity").ConceptItem, index: number, array: import("./entities/concept.entity").ConceptItem[]) => unknown, thisArg?: any): import("./entities/concept.entity").ConceptItem[];
        reduce(callbackfn: (previousValue: import("./entities/concept.entity").ConceptItem, currentValue: import("./entities/concept.entity").ConceptItem, currentIndex: number, array: import("./entities/concept.entity").ConceptItem[]) => import("./entities/concept.entity").ConceptItem): import("./entities/concept.entity").ConceptItem;
        reduce(callbackfn: (previousValue: import("./entities/concept.entity").ConceptItem, currentValue: import("./entities/concept.entity").ConceptItem, currentIndex: number, array: import("./entities/concept.entity").ConceptItem[]) => import("./entities/concept.entity").ConceptItem, initialValue: import("./entities/concept.entity").ConceptItem): import("./entities/concept.entity").ConceptItem;
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: import("./entities/concept.entity").ConceptItem, currentIndex: number, array: import("./entities/concept.entity").ConceptItem[]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: import("./entities/concept.entity").ConceptItem, currentValue: import("./entities/concept.entity").ConceptItem, currentIndex: number, array: import("./entities/concept.entity").ConceptItem[]) => import("./entities/concept.entity").ConceptItem): import("./entities/concept.entity").ConceptItem;
        reduceRight(callbackfn: (previousValue: import("./entities/concept.entity").ConceptItem, currentValue: import("./entities/concept.entity").ConceptItem, currentIndex: number, array: import("./entities/concept.entity").ConceptItem[]) => import("./entities/concept.entity").ConceptItem, initialValue: import("./entities/concept.entity").ConceptItem): import("./entities/concept.entity").ConceptItem;
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: import("./entities/concept.entity").ConceptItem, currentIndex: number, array: import("./entities/concept.entity").ConceptItem[]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends import("./entities/concept.entity").ConceptItem>(predicate: (this: void, value: import("./entities/concept.entity").ConceptItem, index: number, obj: import("./entities/concept.entity").ConceptItem[]) => value is S_2, thisArg?: any): S_2;
        find(predicate: (value: import("./entities/concept.entity").ConceptItem, index: number, obj: import("./entities/concept.entity").ConceptItem[]) => unknown, thisArg?: any): import("./entities/concept.entity").ConceptItem;
        findIndex(predicate: (value: import("./entities/concept.entity").ConceptItem, index: number, obj: import("./entities/concept.entity").ConceptItem[]) => unknown, thisArg?: any): number;
        fill(value: import("./entities/concept.entity").ConceptItem, start?: number, end?: number): import("./entities/concept.entity").ConceptItem[];
        copyWithin(target: number, start: number, end?: number): import("./entities/concept.entity").ConceptItem[];
        entries(): IterableIterator<[number, import("./entities/concept.entity").ConceptItem]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<import("./entities/concept.entity").ConceptItem>;
        includes(searchElement: import("./entities/concept.entity").ConceptItem, fromIndex?: number): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: import("./entities/concept.entity").ConceptItem, index: number, array: import("./entities/concept.entity").ConceptItem[]) => U_3 | readonly U_3[], thisArg?: This): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
        [Symbol.iterator](): IterableIterator<import("./entities/concept.entity").ConceptItem>;
        [Symbol.unscopables](): {
            copyWithin: boolean;
            entries: boolean;
            fill: boolean;
            find: boolean;
            findIndex: boolean;
            keys: boolean;
            values: boolean;
        };
        at(index: number): import("./entities/concept.entity").ConceptItem;
    }[]>;
    findAll(start: Date, end: Date, client: number, take: number): Promise<import("./entities/concept.entity").ConceptItem[]>;
    findOne(id: string): Promise<import("./entities/concept.entity").ConceptItem>;
    update(id: string, updateConceptDto: UpdateConceptItemDto): Promise<{
        concept: import("../concepts/entities/concept.entity").Concept;
        id: number;
        receipt: import("../receipts/entities/receipt.entity").Receipt;
        amount: number;
        description: string;
        isActive: boolean;
    }>;
    close(id: string): Promise<import("./entities/concept.entity").ConceptItem>;
    open(id: string): Promise<import("./entities/concept.entity").ConceptItem>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

export interface IJwtPayload {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    roles: RoleType[];
    isActive: boolean;
    iat?: Date;
    exp?: Date;
}
export declare enum RoleType {
    ADMIN = "ADMIN",
    AUTHOR = "AUTHOR",
    GENERAL = "GENERAL"
}

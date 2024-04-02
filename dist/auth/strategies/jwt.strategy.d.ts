import { Strategy } from 'passport-jwt';
import { IJwtPayload } from '../jwt-payload.interface';
import { UsersService } from 'src/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly _usersService;
    constructor(_usersService: UsersService);
    validate(payload: IJwtPayload): Promise<IJwtPayload>;
}
export {};

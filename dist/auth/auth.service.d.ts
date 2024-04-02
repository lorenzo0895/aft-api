import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';
export declare class AuthService {
    private readonly _usersService;
    private readonly _jwtService;
    constructor(_usersService: UsersService, _jwtService: JwtService);
    signin(signinDto: SigninDto): Promise<{
        token: string;
    }>;
}

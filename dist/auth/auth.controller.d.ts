import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
export declare class AuthController {
    private readonly _authService;
    constructor(_authService: AuthService);
    signin(signinDto: SigninDto): Promise<{
        token: string;
    }>;
}

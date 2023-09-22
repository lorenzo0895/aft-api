import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';
import { IJwtPayload, RoleType } from './jwt-payload.interface';
import { jwtConfigs } from './jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto): Promise<{ token: string }> {
    const user: User = await this._usersService.findByUsername(
      signinDto.username,
    );
    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (user.password !== signinDto.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const { password, ...rest } = user;
    const payload: IJwtPayload = {
      ...rest,
      roles: user.roles.split(',').map((r) => r as RoleType),
    };
    const token = this._jwtService.sign(payload, {
      secret: jwtConfigs.secret,
      expiresIn: '20h',
    });
    return { token };
  }
}

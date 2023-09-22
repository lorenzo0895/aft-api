import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IJwtPayload } from '../jwt-payload.interface';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { jwtConfigs } from '../jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigs.secret,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this._usersService.findByUsername(payload.username);
    if (!user) throw new UnauthorizedException();
    return payload;
  }
}

import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  async signin(@Body() signinDto: SigninDto) {
    return this._authService.signin(signinDto);
  }
}

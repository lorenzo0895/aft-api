import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}

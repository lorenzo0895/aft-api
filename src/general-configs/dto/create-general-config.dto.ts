import { ApiProperty } from "@nestjs/swagger";

export class CreateGeneralConfigDto {
  @ApiProperty()
  key: string;
  @ApiProperty()
  value: string;
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
@ApiTags('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiBearerAuth()
  // @Roles('user')
  @UseGuards(AuthGuard(), RoleGuard)
  @ApiOkResponse({ type: ClientDto, isArray: true })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ClientDto })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Post()
  @ApiOkResponse({ type: ClientDto })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ClientDto })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}

import { PetService } from '@comercial/entities';
import { PetServiceFacade } from '@comercial/facades';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SearchFilterDto } from '@shared/interfaces';

@Controller('pet-service')
export class PetServiceController {
  private readonly logger = new Logger(PetServiceController.name, {
    timestamp: true,
  });

  constructor(private facade: PetServiceFacade) {}

  @Get()
  findAll(@Query() filters: SearchFilterDto) {
    this.logger.log('Obteniendo todos los registros');
    return this.facade.findAll(filters);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: PetService) {
    this.logger.log('Creando un nuevo registro');
    return this.facade.create(payload);
  }

  @Put()
  update(@Param('id') id: string, @Body() payload: PetService) {
    this.logger.log(`Actualizando el registro con el id: ${id}`);
    return this.facade.update(id, payload);
  }

  @Post('searchOne')
  findOneBy(@Body() payload: PetService) {
    this.logger.log(`Buscando el registro con los parametros: ${payload}`);
    return this.facade.findOneBy(payload);
  }

  @Get(':id')
  findOneById(@Param() id: string) {
    this.logger.log(`Buscando el registro con los parametros: ${id}`);
    return this.facade.findOneById(id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    this.logger.log(`Eliminando el registro con el id: ${id}`);
    return this.facade.delete(id);
  }
}

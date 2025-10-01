import { Module } from '@nestjs/common';
import {
  PetServiceFacade,
  PetTypeFacade,
  ProductFacade,
  ReservationFacade,
} from '@comercial/facades';
import {
  PetServiceController,
  PetTypeController,
  ProductController,
  ReservationController,
} from '@comercial/controllers';
import {
  PetServiceService,
  PetTypeService,
  ProductService,
  ReservationService,
} from '@comercial/services';
import { PetService, PetType, Product, Reservation } from '@comercial/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { comercialDatabaseProviders } from '@comercial/providers';

@Module({
  imports: [TypeOrmModule.forFeature([...comercialDatabaseProviders])],
  controllers: [
    PetServiceController,
    PetTypeController,
    ProductController,
    ReservationController,
  ],
  providers: [
    PetServiceService,
    ProductService,
    ReservationService,
    PetTypeService,
    PetServiceFacade,
    ReservationFacade,
    PetServiceFacade,
    ProductFacade,
    PetTypeFacade,
  ],
})
export class ComercialModule {}

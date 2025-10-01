import { PetService, PetType, Product, Reservation } from '@comercial/entities';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const comercialDatabaseProviders: EntityClassOrSchema[] = [
  PetService,
  Product,
  Reservation,
  PetType,
];

import { UserEntity } from '@auth/entities';
import { PersonEntity } from '@auth/entities/person.entity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const authDatabaseProviders: EntityClassOrSchema[] = [
  PersonEntity,
  UserEntity,
];

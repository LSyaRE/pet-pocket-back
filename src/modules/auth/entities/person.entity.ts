import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'people' })
export class PersonEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Clave primaria.',
  })
  id: string;
}

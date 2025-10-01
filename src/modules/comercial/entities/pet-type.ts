import { StatusTable } from '@shared/consts/status-table.const';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'pet_types',
  comment: 'Tipos de mascota que tiene la veterinaria',
})
export class PetType {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Clave primaria .',
  })
  id: string;

  @Column({ nullable: true, comment: 'Usuario que creo el registro' })
  createdBy: string;

  @Column({ nullable: true, comment: 'Usuario que actualizo el registro' })
  updatedBy: string;

  @CreateDateColumn({ comment: 'Fecha de creacion del registro' })
  createdAt: Date;

  @UpdateDateColumn({ comment: 'Fecha de actualizacion del registro' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: 'Fecha de eliminacion del registro' })
  deletedAt?: Date;

  @Column({
    nullable: false,
    comment: 'Nombre del tipo de mascota',
  })
  name: string;

  @Column({
    nullable: true,
    comment: 'Descripcion del tipo de mascota',
  })
  description: string;

  @Column({
    nullable: false,
    comment: 'Estado de la tabla del servicio',
    default: StatusTable.ACTIVE,
  })
  status: StatusTable;
}

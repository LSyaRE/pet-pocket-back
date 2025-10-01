import { StatusTable } from '@shared/consts/status-table.const';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'services', comment: 'Servicios que presta la veterinaria' })
export class PetService {
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
    comment: 'Nombre del servicio prestado por la veterinaria',
  })
  name: string;

  @Column({
    nullable: true,
    comment: 'Descripcion del servicio prestado por la veterinaria',
  })
  description: string;

  @Column({
    nullable: false,
    comment: 'Precio del servicio prestado por la veterinaria',
  })
  price: number;

  @Column({
    nullable: false,
    comment: 'Estado de la tabla del servicio',
    default: StatusTable.ACTIVE,
  })
  status: StatusTable;
}

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
  name: 'reservations',
  comment: 'Reservas que hacen los clientes a la veterinaria',
})
export class Reservation {
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

  // TODO: Crear tabla entidades para las relaciones
  // Relacion con la tabla de servicios

  // Relacion con la tabla de mascotas

  // Relacion con la tabla de usuarios

  @Column({
    nullable: false,
    comment: 'Fecha a la cual ira el cliente a la veterinaria',
  })
  fechaReserva: Date;

  @Column({
    nullable: false,
    comment: 'Estado de la tabla',
    default: StatusTable.ACTIVE,
  })
  status: StatusTable;
}

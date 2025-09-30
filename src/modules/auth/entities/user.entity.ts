import { StatusTable } from '@shared/consts/status-table.const';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Clave primaria.',
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
    comment: 'Usuario de la persona que va a ingresar.',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({ comment: 'Correo de recuperacion de la cuenta', nullable: false })
  email: string;

  @Column({ comment: 'Correo de recuperacion de la cuenta' })
  password: string;

  @Column({
    name: 'refresh_token',
    nullable: true,
    comment: 'Token para la actualizacion del login ',
  })
  refreshToken: string;

  @Column({
    name: 'is_active',
    default: true,
    comment: 'Estado de la cuenta para su uso',
  })
  status: StatusTable;
}

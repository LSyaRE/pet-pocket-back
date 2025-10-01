import { Reservation } from '@comercial/entities';
import { ReservationService } from '@comercial/services';
import { Injectable } from '@nestjs/common';
import { GenericPageableResponse, SearchFilterDto } from '@shared/interfaces';

@Injectable()
export class ReservationFacade {
  constructor(private reservationService: ReservationService) {}
  async findAll(
    filters: SearchFilterDto,
  ): Promise<GenericPageableResponse<Reservation>> {
    return this.reservationService.findAll(filters);
  }

  async create(payload: Reservation) {
    return this.reservationService.create(payload);
  }

  async update(id: string, payload: Partial<Reservation>) {
    return this.reservationService.update(id, payload);
  }

  async findOneBy(reservation: Partial<Reservation>) {
    return this.reservationService.findOneBy(reservation);
  }

  async findOneById(id: string) {
    return this.reservationService.findOneBy({ id });
  }

  async delete(id: string) {
    return this.reservationService.delete(id);
  }
}

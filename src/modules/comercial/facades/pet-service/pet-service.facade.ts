import { PetServiceService } from '@comercial/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PetServiceFacade {
  constructor(private petService: PetServiceService) {}

  async findAll(filters) {
    return this.petService.findAll(filters);
  }

  async create(payload) {
    return this.petService.create(payload);
  }

  async update(id: string, payload) {
    return this.petService.update(id, payload);
  }

  async findOneBy(petService) {
    return this.petService.findOneBy(petService);
  }

  async findOneById(id: string) {
    return this.petService.findOneBy({ id });
  }

  async delete(id: string) {
    return this.petService.delete(id);
  }
}

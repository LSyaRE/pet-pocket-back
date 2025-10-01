import { PetTypeService } from '@comercial/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PetTypeFacade {
  constructor(private petTypeService: PetTypeService) {}

  async findAll(filters) {
    return this.petTypeService.findAll(filters);
  }

  async create(payload) {
    return this.petTypeService.create(payload);
  }

  async update(id: string, payload) {
    return this.petTypeService.update(id, payload);
  }

  async findOneBy(petType) {
    return this.petTypeService.findOneBy(petType);
  }

  async findOneById(id: string) {
    return this.petTypeService.findOneBy({ id });
  }

  async delete(id: string) {
    return this.petTypeService.delete(id);
  }
}

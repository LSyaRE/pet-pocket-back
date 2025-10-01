import { ProductService } from '@comercial/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductFacade {
  constructor(private productService: ProductService) {}

  async findAll(filters) {
    return this.productService.findAll(filters);
  }

  async create(payload) {
    return this.productService.create(payload);
  }

  async update(id: string, payload) {
    return this.productService.update(id, payload);
  }

  async findOneBy(product) {
    return this.productService.findOneBy(product);
  }

  async findOneById(id: string) {
    return this.productService.findOneBy({ id });
  }

  async delete(id: string) {
    return this.productService.delete(id);
  }
}

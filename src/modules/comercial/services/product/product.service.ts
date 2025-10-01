import { Product } from '@comercial/entities';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusTable } from '@shared/consts/status-table.const';
import { SearchFilterDto, GenericPageableResponse } from '@shared/interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async findAll(
    filters: SearchFilterDto,
  ): Promise<GenericPageableResponse<Product>> {
    return this.paginateAndFilter(filters);
  }

  async create(payload: Product) {
    this.logger.log(`Creando un nuevo registro ${payload}`);
    const saved = await this.repository.save(payload);

    this.logger.log('Verficando de que el usuario se creo correctamente');
    if (!saved) {
      this.logger.error('No se ha guardado correctamente');
      throw new BadRequestException('No se ha podido guardar correctamente');
    }
    return saved;
  }

  async update(id: string, payload: Partial<Product>) {
    this.logger.log('Actualizando el registro');
    const updated = await this.repository.update(id, payload);

    this.logger.log('Verificando de que se actualizo correctamente');
    if (!updated) {
      this.logger.error('No se ha podido actualizar correctamente');
      throw new BadRequestException('No se ha podido actualizar correctamente');
    }

    this.logger.log('Devolviendo el registro actualizado');
    return updated;
  }

  async findOneBy(Product: Partial<Product>): Promise<Product | null> {
    this.logger.log(`Iniciando la busqueda del ${Product}`);
    const data = await this.repository.findOneBy(Product);
    this.logger.log('Fin de la busqueda');
    return data;
  }

  async delete(id: string) {
    this.logger.log(`Eliminando el registro con el id: ${id}`);
    this.update(id, { status: StatusTable.DELETED });
    await this.repository.softDelete(id);
  }

  private async paginateAndFilter(
    filters: SearchFilterDto,
  ): Promise<GenericPageableResponse<Product>> {
    const {
      page = 1,
      limit = 20,
      sortBy,
      order = 'ASC',
      ...filterFields
    } = filters;

    const offset = (page - 1) * limit;

    const query = this.repository.createQueryBuilder('entity');

    let paramIndex = 0;

    for (const key in filterFields) {
      if (filterFields[key] === undefined || filterFields[key] === null)
        continue;

      paramIndex++;
      const value = filterFields[key];

      if (Array.isArray(value)) {
        query.andWhere(`entity.${key} IN (:...param${paramIndex})`, {
          [`param${paramIndex}`]: value,
        });
      } else if (typeof value === 'string' && value.includes('%')) {
        query.andWhere(`entity.${key} LIKE :param${paramIndex}`, {
          [`param${paramIndex}`]: value,
        });
      } else if (
        typeof value === 'object' &&
        value.operator &&
        value.value !== undefined
      ) {
        query.andWhere(`entity.${key} ${value.operator} :param${paramIndex}`, {
          [`param${paramIndex}`]: value.value,
        });
      } else {
        query.andWhere(`entity.${key} = :param${paramIndex}`, {
          [`param${paramIndex}`]: value,
        });
      }
    }

    if (sortBy) {
      query.orderBy(`entity.${sortBy}`, order);
    }

    query.skip(offset).take(limit);

    const [data, total] = await query.getManyAndCount();

    return { data, total, page, limit };
  }
}

// dto/search-filter.dto.ts
import { IsOptional, IsString, IsNumber, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchFilterDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number = 1; // página actual, por defecto 1

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number = 20; // cantidad de registros por página

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  // Campos dinámicos para filtros
  [key: string]: any;
}

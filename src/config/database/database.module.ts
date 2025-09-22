import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresDatabaseConfig } from '@config/database/postgres-database.config';

@Module({
    imports: [ TypeOrmModule.forRootAsync(postgresDatabaseConfig()),],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { AuthenticationController } from '@auth/controllers';
import { UserService, AuthenticationService } from '@auth/services';
import { AuthenticationFacade } from '@auth/facades';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@auth/entities';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { authDatabaseProviders } from '@auth/providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([...authDatabaseProviders]),
    JwtModule.register({}),
  ],
  providers: [
    UserService,

    AuthenticationService,
    AuthenticationFacade,
    AtStrategy,
    RtStrategy,
  ],
  exports: [UserService],
  controllers: [AuthenticationController],
})
export class AuthModule {}

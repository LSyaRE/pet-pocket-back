import { AuthDto, LoginDto } from '@auth/dtos';
import { UserEntity } from '@auth/entities';
import {
  EmailAlreadyExistsException,
  UserAlreadyExistsException,
} from '@auth/exceptions';
import { AuthenticationService, UserService } from '@auth/services';
import { TokensDto } from '@core/dtos';
import { Injectable, Logger } from '@nestjs/common';
import { GenericResponse } from '@shared/interfaces/generic-response';

@Injectable()
export class AuthenticationFacade {
  private readonly logger = new Logger(AuthenticationFacade.name, {
    timestamp: true,
  });

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
  ) {}

  async login(payload: LoginDto): Promise<GenericResponse<TokensDto>> {
    this.logger.log(`Buscando el usuario ${payload.username}`);
    const user = await this.userService.findOneByUsername(payload.username);
    this.logger.log(
      `Verificando la contraseña del usuario ${payload.username}`,
    );
    await this.authService.passwordMatch(payload.password, user.password);
    const tokens = await this.authService.regenerateTokens(user.id, user.username) 
    return {
      data: tokens,
      message: 'Login exitoso',
      statusCode: 200,
      timestamp: new Date().toISOString(),
    };
  }

  async register(payload: AuthDto): Promise<GenericResponse<TokensDto>> {
    this.logger.log('Buscando si el usuario ya existe');
    const user: UserEntity | null =
      await this.userService.findOneByUsernameWithoutException(
        payload.username,
      );
    const email: UserEntity | null = await this.userService.findOneByEmail(
      payload.email,
    );

    if (user) {
      this.logger.error('El usuario ya existe');
      throw new UserAlreadyExistsException(payload.username);
    }

    if (email) {
      this.logger.error(
        'El email ya se encuentra registrado por el usuario ' + email.username,
      );
      throw new EmailAlreadyExistsException(email.username);
    }

    this.logger.log('Encriptando contraseña...');
    const hashedPassword = { ...payload };
    hashedPassword.password = await this.authService.hashData(payload.password);
    this.logger.log('Se encripto la contraseña');
    const createdUser = await this.userService.create(hashedPassword);
    const tokens = await this.authService.regenerateTokens(
      createdUser.id,
      createdUser.username,
    );
    return {
      data: tokens,
      message: 'Tokens refrescados correctamente',
      statusCode: 201,
      timestamp: new Date().toISOString(),
    };
  }

  // Para colocar el token en una blacklist si es que aun no se expira
  logout(userId: string): GenericResponse<void> {
    this.userService.updateUsersWithRefreshToken(userId)
    return {
  message: 'Se cerro la sesion correctamente',
  statusCode: 200,
  timestamp: new Date().toISOString()
};
  }

  restorePassword(identity: number) {
    return identity;
  }

  async refresh(data: { userId: string; refreshToken: string }): Promise<GenericResponse<TokensDto>> {
    this.logger.log('Refrescando token...');
    const user = await this.userService.findOneById(data.userId);

    this.logger.log('Validando Refresh token');
    await this.authService.rtMatch(data.refreshToken, user.refreshToken);

    const tokens = await this.authService.validateTokens(
      user.id,
      user.username,
      data.refreshToken,
    );

    return {
      data: tokens,
      message: 'Tokens refrescados correctamente',
      statusCode: 200,
      timestamp: new Date().toISOString(),
    }; 
  }
}

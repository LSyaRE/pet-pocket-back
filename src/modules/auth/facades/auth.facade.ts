import { AuthDto, LoginDto } from '@auth/dtos';
import { UserEntity } from '@auth/entities';
import {
  EmailAlreadyExistsException,
  UserAlreadyExistsException,
} from '@auth/exceptions';
import { AuthenticationService, UserService } from '@auth/services';
import { TokensDto } from '@core/dtos';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthenticationFacade {
  private readonly logger = new Logger(AuthenticationFacade.name, {
    timestamp: true,
  });

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
  ) {}

  async login(payload: LoginDto) {
    this.logger.log(`Buscando el usuario ${payload.username}`);
    const user = await this.userService.findOneByUsername(payload.username);
    this.logger.log(
      `Verificando la contraseña del usuario ${payload.username}`,
    );
    await this.authService.passwordMatch(payload.password, user.password);
    return await this.authService.regenerateTokens(user.id, user.username);
  }

  async register(payload: AuthDto): Promise<TokensDto> {
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
    return await this.authService.regenerateTokens(
      createdUser.id,
      createdUser.username,
    );
  }

  // Para colocar el token en una blacklist si es que aun no se expira
  logout(userId: string) {
    return this.userService.updateUsersWithRefreshToken(userId);
  }

  restorePassword(identity: number) {
    return identity;
  }

  async refresh(data: { userId: string; refreshToken: string }) {
    this.logger.log('Refrescando token...');
    const user = await this.userService.findOneById(data.userId);

    this.logger.log('Validando Refresh token');
    await this.authService.rtMatch(data.refreshToken, user.refreshToken);

    return await this.authService.validateTokens(
      user.id,
      user.username,
      data.refreshToken,
    );
  }
}

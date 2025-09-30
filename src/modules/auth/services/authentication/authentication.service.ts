import { AccessTokensDto, TokensDto } from '@core/dtos';
import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '@auth/services';
import { AUTH_MESSAGE_ERROR } from '@auth/consts';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name, {
    timestamp: true,
  });

  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async validateTokens(id: string, username: string, refreshToken: string) {
    this.logger.log('Validando los tokens');
    const tokens = await this.getAccessTokens(id, username);
    return {
      access_token: tokens.access_token,
      refresh_token: refreshToken,
    };
  }

  async regenerateTokens(id: string, username: string) {
    this.logger.log('Regenerando los tokens');
    const tokens = await this.getTokens(id, username);
    await this.updateRtHash(id, tokens.refresh_token);
    return tokens;
  }

  hashData(data: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(data, saltOrRounds);
  }

  async getTokens(userId: string, username: string): Promise<TokensDto> {
    const rtSecret: string = this.configService.get('RT_SECRET') ?? 'rt-secret';
    const atSecret: string = this.configService.get('AT_SECRET') ?? 'at-secret';

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          expiresIn: 60 * 15,
          secret: atSecret,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: rtSecret,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async getAccessTokens(
    userId: string,
    username: string,
  ): Promise<AccessTokensDto> {
    const atSecret: string = this.configService.get('AT_SECRET') ?? 'at-secret';

    const [at] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          expiresIn: 60 * 15,
          secret: atSecret,
        },
      ),
    ]);

    return {
      access_token: at,
    };
  }

  async updateRtHash(userId: string, rt: string) {
    const hash: string = await this.hashData(rt);
    await this.userService.updateRtHash(userId, hash);
  }

  async passwordMatch(password: string, hash: string): Promise<void> {
    const isPasswordEquals: boolean = await bcrypt.compare(password, hash);
    if (!isPasswordEquals) throw new ForbiddenException(AUTH_MESSAGE_ERROR);
  }

  async rtMatch(rt: string, hashedRt: string) {
    const isRtEquals = await bcrypt.compare(rt.trim(), hashedRt);
    if (!isRtEquals) {
      this.logger.error('El refresh token no es válido');
      throw new ForbiddenException(AUTH_MESSAGE_ERROR);
    }
  }
}

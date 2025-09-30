import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(username: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `El usuario ya esta siendo utilizado.`,
        error: 'Conflict',
      },
      HttpStatus.CONFLICT,
    );
  }
}

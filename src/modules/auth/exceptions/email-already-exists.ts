import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsException extends HttpException {
  constructor(username: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `El email ya esta siendo utilizado.`,
        error: 'Conflict',
      },
      HttpStatus.CONFLICT,
    );
  }
}

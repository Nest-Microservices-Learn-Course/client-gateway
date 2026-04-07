/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Post } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser() {
    return this.client.send('auth.register.user', {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  loginUser() {
    return this.client.send('auth.login.user', {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('verify')
  verifyUser() {
    return this.client.send('auth.verify.user', {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}

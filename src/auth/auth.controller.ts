/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards';
import { type IUser } from './interfaces';
import { Token, User } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Post('verify')
  verifyUser(@User() user: IUser, @Token() token: string) {
    return { user, token };

    // return this.client.send('auth.verify.user', { user, token }).pipe(
    //   catchError((err) => {
    //     throw new RpcException(err);
    //   }),
    // );
  }
}

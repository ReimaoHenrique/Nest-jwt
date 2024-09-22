import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const { username, password } = body;
    console.log(`Tentativa de login: ${username}`);

    const token = await this.authService.login(username, password);

    if (token) {
      console.log(`Login bem-sucedido para: ${username}`);
      return { token };
    } else {
      console.log(`Falha no login para: ${username}`);
      throw new Error('Login falhou');
    }
  }

  @UseGuards(JwtGuard)
  @Get('auth')
  Test() {
    console.log('requisição recebida');
    return { name: 'reimao' };
  }
}

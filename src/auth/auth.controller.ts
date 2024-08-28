import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from '../interfaces/auth.dto';
import { DocumentAuthController } from '../documentation/auth.controller.document';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResponseDTO } from 'src/interfaces/response.dto';
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('login')
  @DocumentAuthController()
  async login(@Body() UserLoginDto: UserLoginDto): Promise<ResponseDTO> {
    try {
      const responseToken = await this.AuthService.validateUser(UserLoginDto);
      return {
        status: HttpStatus.OK,
        response: responseToken,
        error: null,
      };
    } catch (error) {
      if (error.message === 'PER-002') {
        return {
          status: HttpStatus.UNAUTHORIZED,
          response: null,
          error: 'Credencial invalida',
        };
      } else if (error.message === 'PER-003') {
        return {
          status: HttpStatus.NOT_FOUND,
          response: null,
          error: 'Email no encontrado',
        };
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        response: null,
        error: error.message || 'Internal server error',
      };
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../interfaces/user.dto';
import { validateUserData } from 'src/utils/user.utils';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from 'src/interfaces/response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUserController(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseDTO> {
    try {
      await validateUserData(createUserDto.email);

      const user = await this.userService.createUser(createUserDto);
      return {
        status: HttpStatus.CREATED,
        response: user,
        error: null,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            response: null,
            error: 'El email ya está en uso.',
          },
          HttpStatus.CONFLICT,
        );
      } else if (error.message === 'PER-001') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            response: null,
            error: 'El email no es válido.',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            response: null,
            error: 'Error al crear el usuario.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get()
  async findAllUsersController(): Promise<ResponseDTO> {
    try {
      const users = await this.userService.findAllUsers();
      return {
        status: HttpStatus.OK,
        response: users,
        error: null,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          response: null,
          error: 'Error al obtener los usuarios.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

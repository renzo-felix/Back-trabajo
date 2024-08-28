import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UserResponseDto } from '../interfaces/user.dto';
import { Role } from '@prisma/client';
import { hashPassword, validateUserData } from 'src/utils/user.utils';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    await validateUserData(createUserDto.email);

    try {
      const hashedPassword = await hashPassword(createUserDto.password);

      return this.prisma.user.create({
        data: {
          ...createUserDto,
          birthdate: new Date(createUserDto.birthdate),
          password: hashedPassword,
          role: Role.USER,
        },
        select: {
          id: true,
          firstName: true,
          username: true,
          email: true,
          country: true,
          birthdate: true,
          role: true,
        },
      }) as Promise<UserResponseDto>;
    } catch (error) {
      throw new error({
        error,
      });
    }
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        username: true,
        email: true,
        country: true,
        birthdate: true,
        role: true,
      },
    }) as Promise<UserResponseDto[]>;
  }
}

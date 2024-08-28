import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../interfaces/auth.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userLodingDto: UserLoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: userLodingDto.email,
        },
      });

      if (user) {
        const isPasswordCorrect = await argon2.verify(
          user.password,
          userLodingDto.password,
        );
        if (isPasswordCorrect === true) {
          return await this.Token(userLodingDto.email);
        }

        throw new Error('PER-002'); // Invalid credentials
      }

      throw new Error('PER-003'); // Email not found
    } catch (error) {
      throw new Error(error.message || 'Internal server error'); // Internal server error (Error no conocido)
    }
  }

  private async Token(email: string) {
    try {
      const payload = { email };
      const token = await this.jwtService.signAsync(payload);
      return {
        token,
        email,
      };
    } catch (error) {
      throw new Error(error.message || 'Internal server error'); // Internal server error (Error no conocido)
    }
  }
}

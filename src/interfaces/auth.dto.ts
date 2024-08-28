import { ApiProperty } from '@nestjs/swagger';

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
}

export class UserLoginDtoClass {
  @ApiProperty({
    description: 'El correo electrónico del usuario',
    example: 'user@example.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'password123',
    required: true,
  })
  password: string;
}

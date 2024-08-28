import { Role } from '@prisma/client';

export class CreateUserDto {
  readonly firstName: string;
  readonly lastName?: string;
  readonly username?: string;
  readonly email: string;
  readonly password: string;
  readonly country: string;
  readonly birthdate?: Date;
  readonly role: Role = Role.USER; // Valor por defecto utilizando Role de Prisma
  readonly provider?: string;
  readonly providerId?: string;
  readonly profileImg?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string; // Hasheada
  country: string;
  birthdate?: Date;
  role: Role; // Usando el Role de Prisma
}

export interface UserResponseDto {
  id: number;
  firstName: string;
  username?: string;
  email: string;
  country: string;
  birthdate?: Date;
  role: Role;
}

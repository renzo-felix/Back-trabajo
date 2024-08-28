import * as argon2 from 'argon2';
import { PrismaClient } from '@prisma/client';

export const hashPassword = async (password: string): Promise<string> => {
  return argon2.hash(password);
};

export async function validateUserData(email: string): Promise<void> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('PER-001'); // Invalid email
  }
}

export async function findByEmail(email: string) {
  const prisma = new PrismaClient();
  return await prisma.user.findUnique({ where: { email } });
}

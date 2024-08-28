import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { UserLoginDtoClass } from '../interfaces/auth.dto';

export function DocumentAuthController() {
  return applyDecorators(
    ApiTags('auth'),
    ApiOperation({
      summary: 'Inicia sesión con las credenciales proporcionadas',
    }),
    ApiBody({
      description: 'Datos necesarios para iniciar sesión',
      type: UserLoginDtoClass,
      examples: {
        login: {
          summary: 'Ejemplo de datos para iniciar sesión',
          value: {
            email: 'user@example.com',
            password: 'password123',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Token de autenticación JWT devuelto con éxito.',
      type: String,
    }),
    ApiResponse({
      status: 401,
      description: 'Credenciales inválidas.',
    }),
    ApiResponse({
      status: 404,
      description: 'Correo electrónico no encontrado.',
    }),
    ApiResponse({
      status: 500,
      description: 'Error interno del servidor.',
    }),
  );
}

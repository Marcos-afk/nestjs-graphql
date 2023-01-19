import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @IsNotEmpty({ message: 'Campo nome é requerido' })
  @IsString({ message: 'Campo nome deve ser uma string' })
  readonly name: string;

  @IsNotEmpty({ message: 'Campo email é requerido' })
  @IsEmail({}, { message: 'Campo email está com o formato inválido' })
  readonly email: string;

  @IsNotEmpty({ message: 'Campo senha é requerido' })
  @IsString({ message: 'Campo senha deve ser uma string' })
  @MinLength(8, { message: 'Campo senha deve ter no mínimo 8 caracteres' })
  readonly password: string;
}

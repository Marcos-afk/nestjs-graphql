import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Campo nome deve ser uma string' })
  readonly name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Campo email está com o formato inválido' })
  readonly email?: string;

  @IsOptional()
  @IsString({ message: 'Campo senha deve ser uma string' })
  @MinLength(8, { message: 'Campo senha deve ter no mínimo 8 caracteres' })
  readonly password?: string;
}

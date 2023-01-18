import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class FindUserByIdDto {
  @IsNotEmpty({ message: 'Campo id da notificação é requerido' })
  @IsUUID(4, {
    each: true,
    message: 'Campo id de usuário  deve ser um uuid de versão 4',
  })
  readonly id: string;
}

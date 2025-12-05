import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateSeatInput {
  @Field()
  @IsInt()
  rowNo: number;

  @Field()
  @IsString()
  seatNo: number;

  @Field()
  @IsString()
  flightId: string;
}

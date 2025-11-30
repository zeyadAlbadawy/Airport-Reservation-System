import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Flight } from 'src/flight/entities/flight.entity';

@InputType()
export class CreateBooking {
  @IsString()
  @Field({ nullable: false })
  flight: string;

  @Field({ nullable: true })
  @IsString()
  seat?: string;
}

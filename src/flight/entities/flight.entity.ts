import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Flight {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => Int)
  flightNumber: number;

  @Column({ type: 'varchar' })
  @Field(() => String)
  departureAirport: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  destinationAirport: string;

  @Field(() => String)
  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  @Field(() => String)
  departureTime: string;

  @Column({ type: 'time' })
  @Field(() => String)
  arrivalTime: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  airLine: string;

  @Column()
  @Field(() => Int)
  availableSeats: number;
}

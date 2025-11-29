import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  // Relation must not have colum decorator the oneToMany or manyToOne Is Sufficient
  @ManyToOne(() => User, (user) => user.ResponsibleFlights, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Field(() => User, { nullable: true })
  responsibleUser?: User;

  // For the passenger Booked Flights

  @ManyToOne(() => User, (user) => user.bookedFlights, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Field(() => User, { nullable: true })
  bookedByUser?: User;
}

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Flight } from 'src/flight/entities/flight.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.bookedFlights, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @Field(() => Flight)
  @ManyToOne(() => Flight, (flight) => flight.bookings, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  flight: Flight;

  @Field(() => String, { nullable: true })
  @Column()
  seat?: string;

  @Field(() => Date)
  @Column({ default: new Date(Date.now()) })
  createdAt: Date;
}

import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Flight } from 'src/flight/entities/flight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Flight])],
  providers: [BookingResolver, BookingService, UsersService],
})
export class BookingModule {}

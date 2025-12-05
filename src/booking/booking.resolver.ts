import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { CreateBooking } from './dtos/create-booking.dto';
import { UseGuards } from '@nestjs/common';
import { allAuthGuard } from 'src/users/guards/allAuth.guard';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from 'src/users/guards/googleAuth.guard';
import { AdminGuard } from 'src/users/guards/adminAuth.guard';
import { authGuard } from 'src/users/guards/auth.guard';
import { currentUser } from 'src/users/decorators/current-user.decorator';
import { responseMessage } from './dtos/cancel-booking-response.dto';
import { CancelBooking } from './dtos/cancel-booking.input.dto';
import { User } from 'src/users/entities/user.entity';
import { UserDataLoader } from 'src/users/loaders/user.loader';
import { FlightDataLoader } from 'src/flight/loaders/flight.loader';
import { Flight } from 'src/flight/entities/flight.entity';
import { rolesRestrict } from 'src/flight/guards/roles.restrict.guard';
import { SeatService } from 'src/seat/seat.service';

@UseGuards(new allAuthGuard([new authGuard(), new GoogleAuthGuard()]))
@Resolver(() => Booking)
export class BookingResolver {
  constructor(
    private readonly bookingService: BookingService,
    private readonly seatService: SeatService,
    private readonly userLoader: UserDataLoader,
    private readonly flightLoader: FlightDataLoader,
  ) {}

  @Mutation(() => Booking)
  @UseGuards(rolesRestrict('USER'))
  async createBooking(
    @currentUser() user: string,
    @Args('createBooking') bookingBody: CreateBooking,
  ) {
    // 1) Create the seats
    // The res is all the seats without the booking associated with them
    const createdSeats = await Promise.all(
      bookingBody.seats.map(async (seat) => {
        return await this.seatService.createSeat(
          seat.seatNo,
          seat.rowNo,
          seat.flightId,
        );
      }),
    );

    return this.bookingService.createBooking(user, createdSeats);
  }

  @Mutation(() => responseMessage)
  @UseGuards(rolesRestrict('USER'))
  cancelBooking(
    @currentUser() user: string,
    @Args('cancelBooking') cancelBody: CancelBooking,
  ) {
    return this.bookingService.cancelBooking(user, cancelBody.bookingId);
  }

  @ResolveField(() => User)
  async user(@Parent() booking: Booking) {
    return this.userLoader.userLoader.load(booking.userId);
  }

  @ResolveField(() => Flight)
  async flight(@Parent() booking: Booking) {
    return this.flightLoader.flightLoader.load(booking.flightId);
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
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

@UseGuards(new allAuthGuard([new authGuard(), new GoogleAuthGuard()]))
@Resolver()
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Mutation(() => Booking)
  createBooking(
    @currentUser() user: string,
    @Args('createBooking') bookingBody: CreateBooking,
  ) {
    return this.bookingService.createBooking(user, bookingBody);
  }

  @Mutation(() => responseMessage)
  cancelBooking(
    @currentUser() user: string,
    @Args('cancelBooking') cancelBody: CancelBooking,
  ) {
    return this.bookingService.cancelBooking(user, cancelBody.bookingId);
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { CreateBooking } from './dtos/create-booking.dto';
import { User } from 'src/users/entities/user.entity';
import { Flight } from 'src/flight/entities/flight.entity';
import { Seat } from 'src/seat/entities/seat.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Flight) private readonly flightRepo: Repository<Flight>,
    @InjectRepository(Seat) private readonly seatRepo: Repository<Seat>,
  ) {}

  async createBooking(userId: string, seatCreated: Seat[]) {
    // 1) Check if the user exists
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user)
      throw new NotFoundException(`There is no user with an id of ${userId}`);

    // 2) All seats must belong to the same flight
    const flightId = seatCreated[0].flightId;
    const flight = await this.flightRepo.findOne({ where: { id: flightId } });
    if (!flight) throw new NotFoundException(`Flight not found`);

    // 3) Check if user already booked this flight
    const foundedBooking = await this.bookingRepo.findOne({
      where: {
        user: { id: userId },
        flight: { id: flightId },
      },
      relations: ['user', 'flight'],
    });

    console.log(foundedBooking);

    if (foundedBooking)
      throw new BadRequestException(
        `You already booked this flight. Cancel your booking first.`,
      );

    const newBooking = this.bookingRepo.create({
      user,
      flight,
      userId,
      flightId,
      seat: [],
    });

    // Save booking to generate UUID
    const savedBooking = await this.bookingRepo.save(newBooking);

    // Assign the bookiong related each seat to the currently booking
    seatCreated.forEach((seat) => (seat.booking = savedBooking));
    await this.seatRepo.save(seatCreated);

    flight.availableSeats -= seatCreated.length;
    await this.flightRepo.save(flight);
    return savedBooking;
  }

  async cancelBooking(userId: string, flightId: string) {
    const foundedBooking = await this.bookingRepo.findOne({
      where: {
        id: flightId,
      },
      relations: ['user', 'flight'],
    });

    if (foundedBooking?.user.id !== userId)
      throw new UnauthorizedException(
        `You are not allowed to do this action as it belongs to another user`,
      );

    foundedBooking.flight.availableSeats += 1;
    await this.flightRepo.save(foundedBooking.flight);

    await this.bookingRepo.delete(foundedBooking);
    return {
      message: `booking with an id of ${foundedBooking.id} has been deleted successfully!`,
    };
  }
}

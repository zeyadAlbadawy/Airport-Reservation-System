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

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Flight) private readonly flightRepo: Repository<Flight>,
  ) {}

  async createBooking(userId: string, bookingBody: CreateBooking) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user)
      throw new NotFoundException(`There is no user with an id of ${userId}`);
    const flight = await this.flightRepo.findOne({
      where: { id: bookingBody.flight },
    });
    if (!flight)
      throw new NotFoundException(
        `There is no flight founded with an id of ${bookingBody.flight}`,
      );

    if (!flight.availableSeats)
      throw new BadRequestException(`No seats available`);

    const foundedBooking = await this.bookingRepo.findOne({
      where: {
        user: { id: userId },
        flight: { id: bookingBody.flight },
      },
      relations: ['flight', 'user'],
    });

    if (foundedBooking)
      return new BadRequestException(
        `There is another booking with the same flight, try searching for another`,
      );

    flight.availableSeats -= 1;
    await this.flightRepo.save(flight);
    const newBooking = this.bookingRepo.create({
      user,
      flight,
      seat: bookingBody.seat,
    });
    return await this.bookingRepo.save(newBooking);
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

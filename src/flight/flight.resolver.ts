import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { FlightService } from './flight.service';
import { Flight } from './entities/flight.entity';
import { CreateFlightInput } from './dto/create-flight.input';
import { UseGuards } from '@nestjs/common';
import { FlightRestrict } from './guards/admin.crew.restrict.guard';
import { allAuthGuard } from 'src/users/guards/allAuth.guard';
import { authGuard } from 'src/users/guards/auth.guard';
import { GoogleAuthGuard } from 'src/users/guards/googleAuth.guard';
import { UpdateFlightInput } from './dto/update-flight.input';
import { FlightResponse } from './dto/flight.response.dto';
import { FlightFilterDto } from './dto/filter-flight.input.dto';
import { FlightPaginationResponse } from './dto/Flight-pagination-respnse.dto';

@Resolver(() => Flight)
export class FlightResolver {
  constructor(private readonly flightService: FlightService) {}

  // Restrict this action to ADMIN AND CREW
  @UseGuards(
    new allAuthGuard([new authGuard(), new GoogleAuthGuard()]),
    FlightRestrict,
  )
  @Mutation(() => Flight)
  createFlight(
    @Args('CreateFlightInput') CreateFlightInput: CreateFlightInput,
    @Context() context: any,
  ) {
    return this.flightService.createFlight(CreateFlightInput);
  }

  @UseGuards(
    new allAuthGuard([new authGuard(), new GoogleAuthGuard()]),
    FlightRestrict,
  )
  @Mutation(() => Flight)
  updateFlight(
    @Args('id') id: string,
    @Args('UpdateFlightInput') updateFlight: UpdateFlightInput,
    @Context() context: any,
  ) {
    return this.flightService.updateFlight(id, updateFlight);
  }

  @UseGuards(
    new allAuthGuard([new authGuard(), new GoogleAuthGuard()]),
    FlightRestrict,
  )
  @Mutation(() => FlightResponse)
  removeFlight(@Args('id') id: string) {
    return this.flightService.cancelFlight(id);
  }

  @Query(() => FlightPaginationResponse)
  async flights(@Args('flightFilter') flightFilterInput: FlightFilterDto) {
    return await this.flightService.retriveFlights(flightFilterInput);
  }
}

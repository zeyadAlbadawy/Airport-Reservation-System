import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth.service';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { Flight } from 'src/flight/entities/flight.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Flight]),
    forwardRef(() => GoogleAuthModule),
  ],
  providers: [UsersResolver, UsersService, AuthService],
  exports: [UsersService, AuthService],
})
export class UsersModule {}

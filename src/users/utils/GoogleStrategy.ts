import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth.service';
import { use } from 'passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>(
        'GOOGLE_AUTH_CLIENT_SECRET',
      ),
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // implement your logic here
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);
    const user = await this.authService.validateUserGoogleAuth({
      email: profile.emails?.[0]?.value ?? 'null',
      displayName: profile.displayName,
    });

    console.log('validating in google strategy!');

    return user || null;
  }
}

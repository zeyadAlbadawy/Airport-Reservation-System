import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SendGrid from '@sendgrid/mail';
import { Queue } from 'bullmq';

@Injectable()
export class SendGridService {
  constructor(
    private readonly configService: ConfigService,
    @InjectQueue('email') private readonly emailQueue: Queue,
  ) {
    SendGrid.setApiKey(
      this.configService.getOrThrow<string>('SEND_GRID_API_KEY'),
    );
  }

  async send(mail: SendGrid.MailDataRequired) {
    console.log(mail);
    // The sending mail takes much time and resources so i will schedule this task at the BullMq
    await this.emailQueue.add('sending-token-sendGrid', mail);
  }
}

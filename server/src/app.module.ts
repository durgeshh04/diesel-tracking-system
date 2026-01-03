import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DBConfig } from './config/db.config';
import { DieselModule } from './diesel/diesel.module';
import { ZohoModule } from './zoho/zoho.module';
import { TallyModule } from './tally/tally.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        throttlers: [
          {
            ttl: 60,
            limit: Number(process.env.RATE_LIMIT ?? 30),
          },
        ],
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    DBConfig,
    DieselModule,
    ZohoModule,
    TallyModule,
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

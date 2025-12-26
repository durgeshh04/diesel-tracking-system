import { Module } from '@nestjs/common';
import { SyncJob } from './sync.job';
import { DieselModule } from '../diesel/diesel.module';
import { TallyModule } from '../tally/tally.module';

@Module({
  imports: [DieselModule, TallyModule],
  providers: [SyncJob],
})
export class CronModule {}

import { Module } from '@nestjs/common';
import { ZohoService } from './zoho.service';
import { ZohoController } from './zoho.controller';
import { DieselModule } from '../diesel/diesel.module';
import { TallyModule } from '../tally/tally.module';

@Module({
  imports: [DieselModule, TallyModule],
  controllers: [ZohoController],
  providers: [ZohoService],
})
export class ZohoModule {}

import { Module } from '@nestjs/common';
import { DieselService } from './diesel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DieselEntry } from './entities/diesel.entity';
import { DieselController } from './diesel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DieselEntry])],
  controllers: [DieselController],
  providers: [DieselService],
  exports: [DieselService],
})
export class DieselModule {}

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DieselService } from '../diesel/diesel.service';
import { TallyService } from '../tally/tally.service';

/**
 * This is Syncing file for automatically updating the status.
 */
@Injectable()
export class SyncJob {
  constructor(
    private readonly dieselService: DieselService,
    private readonly tallyService: TallyService,
  ) {}

  /**
   * This is method which actually updates the diesel pending data
   */

  @Cron('*/2 * * * *')
  async syncPendingEntries() {
    const pending = await this.dieselService.findPending();

    for (const entry of pending) {
      try {
        await this.tallyService.pushVoucher(entry);
        await this.dieselService.markAsSynced(entry.id);
      } catch (err) {
        await this.dieselService.markAsFailed(entry.id);
      }
    }
  }
}

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DieselEntry } from '../diesel/entities/diesel.entity';
import {
  buildDieselPurchaseVoucher,
  buildDieselConsumptionVoucher,
} from './tally-xml.builder';

/**
 * This is TallyService class
 */

@Injectable()
export class TallyService {
  private readonly TALLY_URL: any = process.env.TALLY_PRIME;

  /**
   * Created method for handling IN and OUT flow of the diesel
   * @param entry
   * @returns
   */

  async pushVoucher(entry: DieselEntry) {
    let xml: string;

    if (entry.type === 'IN') {
      xml = buildDieselPurchaseVoucher({
        quantity: Number(entry.quantity),
        siteName: entry.siteName,
        referenceNo: entry.referenceNo,
        entryDate: entry.entryDate,
      });
    } else {
      xml = buildDieselConsumptionVoucher({
        quantity: Number(entry.quantity),
        siteName: entry.siteName,
        referenceNo: entry.referenceNo,
        entryDate: entry.entryDate,
      });
    }

    const response = await axios.post(this.TALLY_URL, xml, {
      headers: { 'Content-Type': 'application/xml' },
    });

    return response.data;
  }
}

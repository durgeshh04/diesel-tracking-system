import { Injectable } from '@nestjs/common';
import { DieselService } from '../diesel/diesel.service';
import { mapZohoPayloadToDto } from './zoho.mapper';
import { validateOrReject } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateZohoDto } from './dto/create-zoho.dto';
// import { TallyService } from '../tally/tally.service';

/**
 * This service is handles the zoho form data and creates entry
 */

@Injectable()
export class ZohoService {
  constructor(
    private readonly dieselService: DieselService,
    // private readonly tallyService: TallyService,
  ) {}

  /**
   * This method handles the payload coming from zoho form
   * @param payload
   * @returns
   */

  async handleZohoPayload(payload: any) {
    try {
      const plainDto = mapZohoPayloadToDto(payload);

      const dto = plainToInstance(CreateZohoDto, plainDto);

      await validateOrReject(dto);

      const entry = await this.dieselService.createFromZoho(dto);
      return entry;
    } catch (error) {
      console.error('Zoho payload processing failed:', error);
      throw new BadRequestException('Invalid Zoho payload');
    }
  }
}

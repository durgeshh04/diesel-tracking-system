import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ZohoService } from './zoho.service';

/**
 * This is zoho service file
 */

@Controller('zoho')
export class ZohoController {
  constructor(private readonly zohoService: ZohoService) {}

  /**
   * This webhook endpoint triggers when data filled in the zoho form
   * @param payload
   * @returns
   */

  @Post('webhook')
  @HttpCode(200)
  async recieve(@Body() payload: any) {
    await this.zohoService.handleZohoPayload(payload);
    return {
      success: true,
      message: 'Zoho payload processed successfully',
    };
  }
}

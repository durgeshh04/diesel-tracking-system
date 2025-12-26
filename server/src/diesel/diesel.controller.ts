import { Controller, Get } from '@nestjs/common';
import { DieselService } from './diesel.service';

/**
 * This is Diesel Controller
 */

@Controller('diesel')
export class DieselController {
  constructor(private readonly dieselService: DieselService) {}

  /**
   * This api endpoing responsible for resulting in all diesel data
   * @returns
   */

  @Get()
  async getAll() {
    return await this.dieselService.getAll();
  }
}

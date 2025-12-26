import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * This is App controller
 */

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Health Check endpoint
   * @returns
   */

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

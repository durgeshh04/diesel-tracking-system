import { Injectable } from '@nestjs/common';

/**
 * This is AppService File
 */
@Injectable()
export class AppService {
  /**
   * This is health check method
   * @returns
   */
  getHello(): string {
    return 'Hello World!';
  }
}

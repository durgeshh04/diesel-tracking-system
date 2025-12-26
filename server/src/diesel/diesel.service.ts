import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DieselEntry } from './entities/diesel.entity';
import { CreateZohoDto } from '../zoho/dto/create-zoho.dto';

/**
 * This is Diesel Service file
 */

@Injectable()
export class DieselService {
  constructor(
    @InjectRepository(DieselEntry)
    private readonly repo: Repository<DieselEntry>,
  ) {}

  /**
   * This method is accepts zoho form details and create the entry
   * @param dto
   * @returns
   */

  async createFromZoho(dto: CreateZohoDto) {
    const entry = this.repo.create({
      ...dto,
      entryDate: new Date(dto.entryDate),
      source: 'zoho',
      syncStatus: 'PENDING',
    });

    return this.repo.save(entry);
  }

  /**
   * This method fetches all the data of entries from DB
   * @returns
   */

  async getAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  /**
   * This method is used for finding pending entries
   * @returns
   */

  async findPending() {
    return this.repo.find({
      where: { syncStatus: 'PENDING' },
    });
  }

  /**
   * This method updates pending entry to synced
   * @param id
   */

  async markAsSynced(id: string) {
    await this.repo.update(id, { syncStatus: 'SYNCED' });
  }

  /**
   * This method updates pending entry to failed if any error occurs
   * @param id
   */

  async markAsFailed(id: string) {
    await this.repo.update(id, { syncStatus: 'FAILED' });
  }
}

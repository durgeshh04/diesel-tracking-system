import { Test, TestingModule } from '@nestjs/testing';
import { ZohoService } from './zoho.service';
import { DieselService } from '../diesel/diesel.service';

describe('ZohoService', () => {
  let service: ZohoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZohoService,
        {
          provide: DieselService,
          useValue: {
            createFromZoho: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZohoService>(ZohoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

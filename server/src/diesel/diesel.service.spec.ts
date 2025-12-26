import { Test, TestingModule } from '@nestjs/testing';
import { DieselService } from './diesel.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DieselEntry } from './entities/diesel.entity';

describe('DieselService', () => {
  let service: DieselService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DieselService,
        {
          provide: getRepositoryToken(DieselEntry),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DieselService>(DieselService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

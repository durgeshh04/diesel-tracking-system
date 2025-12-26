import { Test, TestingModule } from '@nestjs/testing';
import { TallyService } from './tally.service';

describe('TallyService', () => {
  let service: TallyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TallyService],
    }).compile();

    service = module.get<TallyService>(TallyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

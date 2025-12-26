import { Test, TestingModule } from '@nestjs/testing';
import { DieselController } from './diesel.controller';
import { DieselService } from './diesel.service';

describe('DieselController', () => {
  let controller: DieselController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DieselController],
      providers: [
        {
          provide: DieselService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DieselController>(DieselController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

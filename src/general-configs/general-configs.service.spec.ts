import { Test, TestingModule } from '@nestjs/testing';
import { GeneralConfigsService } from './general-configs.service';

describe('GeneralConfigsService', () => {
  let service: GeneralConfigsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralConfigsService],
    }).compile();

    service = module.get<GeneralConfigsService>(GeneralConfigsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

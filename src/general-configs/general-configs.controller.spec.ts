import { Test, TestingModule } from '@nestjs/testing';
import { GeneralConfigsController } from './general-configs.controller';
import { GeneralConfigsService } from './general-configs.service';

describe('GeneralConfigsController', () => {
  let controller: GeneralConfigsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralConfigsController],
      providers: [GeneralConfigsService],
    }).compile();

    controller = module.get<GeneralConfigsController>(GeneralConfigsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

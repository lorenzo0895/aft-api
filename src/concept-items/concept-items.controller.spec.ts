import { Test, TestingModule } from '@nestjs/testing';
import { ConceptItemController } from './concept-items.controller';
import { ConceptItemService } from './concept-items.service';

describe('ConceptItemController', () => {
  let controller: ConceptItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConceptItemController],
      providers: [ConceptItemService],
    }).compile();

    controller = module.get<ConceptItemController>(ConceptItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

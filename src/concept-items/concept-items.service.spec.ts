import { Test, TestingModule } from '@nestjs/testing';
import { ConceptItemService } from './concept-items.service';

describe('ConceptItemService', () => {
  let service: ConceptItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConceptItemService],
    }).compile();

    service = module.get<ConceptItemService>(ConceptItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

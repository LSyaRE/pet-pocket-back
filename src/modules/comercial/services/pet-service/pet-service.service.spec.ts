import { Test, TestingModule } from '@nestjs/testing';
import { PetServiceService } from './pet-service.service';

describe('PetServiceService', () => {
  let service: PetServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetServiceService],
    }).compile();

    service = module.get<PetServiceService>(PetServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

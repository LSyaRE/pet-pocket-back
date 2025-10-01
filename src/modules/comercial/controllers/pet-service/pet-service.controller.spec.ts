import { Test, TestingModule } from '@nestjs/testing';
import { PetServiceController } from './pet-service.controller';

describe('PetServiceController', () => {
  let controller: PetServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetServiceController],
    }).compile();

    controller = module.get<PetServiceController>(PetServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

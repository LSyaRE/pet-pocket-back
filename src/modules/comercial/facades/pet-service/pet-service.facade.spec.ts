import { PetServiceFacade } from './pet-service.facade';

describe('PetServiceFacade', () => {
  it('should be defined', () => {
    expect(new PetServiceFacade()).toBeDefined();
  });
});

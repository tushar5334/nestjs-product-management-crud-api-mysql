import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { LocationRepository } from './locations-repository';

const mockLocationRepository = () => ({
  getAllLocations: jest.fn(),
});

describe('LocationsService', () => {
  let locationService: LocationsService;
  let locationRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsService, { provide: LocationRepository, useFactory: mockLocationRepository },],
    }).compile();

    locationService = await module.get<LocationsService>(LocationsService);
    locationRepository = await module.get<LocationRepository>(LocationRepository);
  });

  describe('getAllLocations', () => {
    it('gets all locations from the repository', async () => {
      const dummyRes = [{ "id": 1, "location_name": "India", "created_at": "2024-01-29T11:39:44.000Z", "updated_at": "2024-01-29T11:39:44.000Z" }, { "id": 2, "location_name": "US", "created_at": "2024-01-29T11:39:47.000Z", "updated_at": "2024-01-29T11:39:47.000Z" }, { "id": 3, "location_name": "UK", "created_at": "2024-01-29T11:39:50.000Z", "updated_at": "2024-01-29T11:39:50.000Z" }];
      locationRepository.getAllLocations.mockResolvedValue(dummyRes);
      expect(locationRepository.getAllLocations).not.toHaveBeenCalled();
      const result = await locationService.findAll();
      expect(locationRepository.getAllLocations).toHaveBeenCalled();
      expect(result).toEqual(dummyRes);
    });
  });
});

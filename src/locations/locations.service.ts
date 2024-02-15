import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationRepository } from './locations-repository';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {

  constructor(
    @InjectRepository(LocationRepository)
    private locationsRepository: LocationRepository) { }


  findAll(): Promise<Location[]> {
    return this.locationsRepository.getAllLocations()
  }
}

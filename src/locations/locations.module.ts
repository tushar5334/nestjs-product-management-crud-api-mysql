import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { Location } from './entities/location.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationRepository } from './locations-repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Location]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService, LocationRepository],
})
export class LocationsModule { }

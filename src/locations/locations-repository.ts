import { DataSource, Repository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Location } from "./entities/location.entity";




@Injectable()
export class LocationRepository extends Repository<Location> {

    constructor(private dataSource: DataSource) {
        super(Location, dataSource.createEntityManager());
    }

    async getAllLocations(): Promise<any> {
        const query = this.createQueryBuilder('location');
        try {
            const locations = await query.getMany();
            return locations;
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
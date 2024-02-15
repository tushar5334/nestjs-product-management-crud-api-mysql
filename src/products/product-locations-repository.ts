import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ProductLocation } from "./entities/product-location.entity";
import { CreateProductLocationDto } from "./dto/create-product-location.dto";



@Injectable()
export class ProductLocationsRepository extends Repository<ProductLocation> {

    constructor(private dataSource: DataSource) {
        super(ProductLocation, dataSource.createEntityManager());
    }

    async createLocationWiseProductQty(createProductLocationDto: CreateProductLocationDto): Promise<ProductLocation> {
        const { productId, locationId, qty } = createProductLocationDto;
        const productLocationObj: ProductLocation = this.create({
            productId,
            locationId,
            qty
        });
        await this.save(productLocationObj);
        return productLocationObj;
    }
}
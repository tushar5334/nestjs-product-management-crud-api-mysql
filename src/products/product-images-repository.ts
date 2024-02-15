import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

import { ProductImage } from "./entities/product-image.entity";
import { CreateProductImageDto } from "./dto/create-product-image.dto";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class ProductImagesRepository extends Repository<ProductImage> {

    constructor(private dataSource: DataSource, private readonly configService: ConfigService) {
        super(ProductImage, dataSource.createEntityManager());
    }

    async createProductImage(createProductImageDto: CreateProductImageDto): Promise<ProductImage> {
        const { productId, image } = createProductImageDto;
        const imageUrl = `${this.configService.get('APP_URL')}:${process.env.PORT}/product/${image}`;
        const productImageobj: ProductImage = this.create({
            productId,
            image: imageUrl
        });
        await this.save(productImageobj);
        return productImageobj;
    }
}
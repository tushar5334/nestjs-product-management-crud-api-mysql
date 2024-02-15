import { DataSource, Repository } from "typeorm";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";


@Injectable()
export class ProductRepository extends Repository<Product> {

    constructor(private dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }


    async getAllProducts(): Promise<any> {
        return await this.find({});
    }

    async creatProduct(createProductDto: CreateProductDto): Promise<Product> {
        const { name, price, type } = createProductDto
        const product: Product = this.create({
            name,
            price,
            type: +type
        });
        await this.save(product);
        return product;
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const { name, price, type } = updateProductDto
        const result = await this.update({ id }, { name, price, type });
        if (result.affected === 0) {
            throw new NotFoundException(`Product with ${id} not found`)
        }
        return await this.findOne({
            where: {
                id
            }
        })
    }
}
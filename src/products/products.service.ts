import { Injectable, NotFoundException, UploadedFiles } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './products-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImagesRepository } from './product-images-repository';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { CreateProductLocationDto } from './dto/create-product-location.dto';
import { ProductLocationsRepository } from './product-locations-repository';
@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(ProductRepository)
    private productsRepository: ProductRepository, private productImagesRepository: ProductImagesRepository, private productLocationsRepository: ProductLocationsRepository) { }

  async create(createProductDto: CreateProductDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<Product> {

    const productObj = await this.productsRepository.creatProduct(createProductDto);


    if (productObj) {
      //Insert location wise quantity
      const { locationQty } = createProductDto;
      const locationQtyData: any = JSON.parse(locationQty) || JSON.parse("[]");
      //console.log("locationQtyData::", JSON.parse(locationQtyData));
      if (locationQtyData && locationQtyData.length > 0) {
        locationQtyData.forEach(async (locationQtyObj: CreateProductLocationDto) => {
          const { locationId, qty } = locationQtyObj;
          const productLocationQtyObj: CreateProductLocationDto = { productId: productObj.id, locationId, qty };
          await this.productLocationsRepository.createLocationWiseProductQty(productLocationQtyObj)
        })
      }

      // Upload multiple images
      if (files && files.length > 0) {
        files.forEach(async (file: any) => {
          const productImageObj: CreateProductImageDto = { productId: productObj.id, image: file.filename };
          await this.productImagesRepository.createProductImage(productImageObj)
        });
      }
    }

    return productObj;
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.getAllProducts()
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: {
        id
      }
    })
    if (!product) {
      throw new NotFoundException(`Product with ${id} not found`)
    }
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<Product> {
    const productObj = await this.productsRepository.updateProduct(id, updateProductDto);

    //Insert location wise quantity
    const { locationQty } = updateProductDto;

    await this.productLocationsRepository.delete({ productId: productObj.id });
    const locationQtyData: any = JSON.parse(locationQty) || JSON.parse("[]");
    //console.log("locationQtyData::", locationQtyData);
    if (locationQtyData && locationQtyData.length > 0) {
      locationQtyData.forEach(async (locationQtyObj: CreateProductLocationDto) => {
        const { locationId, qty } = locationQtyObj;
        const productLocationQtyObj: CreateProductLocationDto = { productId: productObj.id, locationId, qty };
        await this.productLocationsRepository.createLocationWiseProductQty(productLocationQtyObj)
      })
    }

    // Upload multiple images
    if (files && files.length > 0) {
      //await this.productImagesRepository.delete({ productId: productObj.id });
      files.forEach(async (file: any) => {
        const productImageObj: CreateProductImageDto = { productId: productObj.id, image: file.filename };
        await this.productImagesRepository.createProductImage(productImageObj)
      });
    }

    return productObj;
  }

  async remove(id: number): Promise<void> {
    await this.productLocationsRepository.delete({ productId: id });
    await this.productImagesRepository.delete({ productId: id });
    const result = await this.productsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ${id} not found`)
    }
  }
}

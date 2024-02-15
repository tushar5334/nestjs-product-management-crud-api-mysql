import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './products-repository';
import { ProductImagesRepository } from './product-images-repository';
import { ProductImage } from './entities/product-image.entity';
import { ProductLocation } from './entities/product-location.entity';
import { ProductLocationsRepository } from './product-locations-repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Product, ProductImage, ProductLocation]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository, ProductImagesRepository, ProductLocationsRepository, ConfigService],
})
export class ProductsModule { }

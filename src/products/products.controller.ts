import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../helpers/file-helper';
import { Express } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('images',
    5,
    {
      storage: diskStorage({
        destination: './public/product',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }
  ))

  create(@Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ): any {
    //console.log("createProductDto::", createProductDto)
    return this.productsService.create(createProductDto, files);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images',
    5,
    {
      storage: diskStorage({
        destination: './public/product',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }
  ))

  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFiles() files: Array<Express.Multer.File>): any {
    return this.productsService.update(+id, updateProductDto, files);
  }

  @Delete(':id')
  // 
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}

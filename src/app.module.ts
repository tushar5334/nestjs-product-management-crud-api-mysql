import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { LocationsModule } from './locations/locations.module';
import { Product } from './products/entities/product.entity';
import { Location } from './locations/entities/location.entity';
import { ProductImage } from './products/entities/product-image.entity';
import { ProductLocation } from './products/entities/product-location.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      //STAGE will be coming from package.json
      //envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [Product, Location, ProductImage, ProductLocation],
          synchronize: true,
        };
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      //rootPath: join(__dirname, '..'),
    }),
    ProductsModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

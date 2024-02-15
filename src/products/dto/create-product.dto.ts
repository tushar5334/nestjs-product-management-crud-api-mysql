import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateProductLocationDto } from './create-product-location.dto';
import { Type } from 'class-transformer';
export class CreateProductDto {
    @IsNotEmpty({
        message: 'Title is required',
    })
    name: string;

    @IsNotEmpty({
        message: 'Price is required',
    })
    price: number;

    @IsNotEmpty({
        message: 'Type is required',
    })
    type: number;

    /* @IsArray({
       message: 'locationQty must be an array',
   }) */
    @IsOptional()
    @IsString({
        message: 'locationQty must be a string',
    })
    locationQty: string;

    //@Type(() => CreateProductLocationDto)
    //locationQty: CreateProductLocationDto[];
}
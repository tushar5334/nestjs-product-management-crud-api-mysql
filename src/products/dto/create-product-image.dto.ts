import { IsNotEmpty } from 'class-validator';
export class CreateProductImageDto {
    @IsNotEmpty({
        message: 'Product id is required',
    })
    productId: number;

    @IsNotEmpty({
        message: 'Image is required',
    })
    image: string;
}
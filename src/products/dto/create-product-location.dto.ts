import { IsNotEmpty } from 'class-validator';
export class CreateProductLocationDto {
    @IsNotEmpty({
        message: 'Product id is required',
    })
    productId: number;

    @IsNotEmpty({
        message: 'Location id is required',
    })
    locationId: number;

    @IsNotEmpty({
        message: 'Quantity is required',
    })
    qty: number;
}
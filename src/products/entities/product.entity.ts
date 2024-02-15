import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { ProductLocation } from "./product-location.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: false, type: "float" })
    public price!: number

    @Column()
    type: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /* @Column('datetime', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column('datetime', { nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date; */

    @OneToMany(() => ProductImage, (productImage) => productImage.product, { eager: true })
    productImages: ProductImage[];

    @OneToMany(() => ProductLocation, (productLocation) => productLocation.product, { eager: true })
    productLocations: ProductLocation[];

}

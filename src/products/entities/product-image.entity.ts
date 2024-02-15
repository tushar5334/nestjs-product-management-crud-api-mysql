import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /* @Column('datetime', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column('datetime', { nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date; */

    @ManyToOne(() => Product, (product) => product.productImages, { eager: false })
    product: Product;
}

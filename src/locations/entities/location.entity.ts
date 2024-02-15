import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    location_name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /* @Column('datetime', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column('datetime', { nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date; */

}

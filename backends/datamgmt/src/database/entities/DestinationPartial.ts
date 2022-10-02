import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, } from "typeorm";
import { Location } from "./Location";

@Entity()
export class DestinationPartial {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Location, location => location.destinationPartial)
    @JoinColumn()
    location: Location

    @Column({ type: "varchar", nullable: false, length: 255 })
    message: Location

}
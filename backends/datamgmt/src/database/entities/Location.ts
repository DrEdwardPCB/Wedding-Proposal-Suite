import { Entity, Index, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Point } from 'geojson';
import { User } from "./User";
import { DestinationPartial } from './DestinationPartial';
import { PasswordPartial } from './PasswordPartial';
@Entity()
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => User, (user) => user.location)
    @JoinColumn()
    user: User

    @Column({ type: "varchar", length: "50", nullable: true })


    @Column({ type: "text", nullable: true })
    message: string

    @Column({ type: "varchar", length: 255, nullable: true })
    photoone: string

    @Column({ type: "varchar", length: 255, nullable: true })
    phototwo: string

    @Column({ type: "varchar", length: 255, nullable: true })
    photothree: string

    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType: 'Point',
        srid: 4326,
        nullable: true,
    })
    location: Point

    @OneToOne(() => Location, location => location.prev)
    @JoinColumn()
    next: Location

    @OneToOne(() => Location, location => location.next)
    prev: Location

    @Column({ type: "varchar", nullable: true })
    locationDescription: string

    @Column({ type: "timestamp", precision: 6, nullable: true })
    scanTime: Date

    @OneToOne(() => DestinationPartial, destinationPartial => destinationPartial.location)
    destinationPartial?: DestinationPartial

    @OneToOne(() => PasswordPartial, passwordPartial => passwordPartial.location)
    passwordPartial?: PasswordPartial

}
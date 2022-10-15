import { Entity, Index, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Point } from 'geojson';
import { User } from "./User";
import { DestinationPartial } from './DestinationPartial';
import { PasswordPartial } from './PasswordPartial';
@Entity()
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => User, (user) => user.location, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn()
    user: User | null

    @Column({ type: "varchar", length: 50, nullable: true })
    displayName: string | null

    @Column({ type: "text", nullable: true })
    message: string | null

    @Column({ type: "varchar", length: 255, nullable: true })
    photoone: string | null

    @Column({ type: "varchar", length: 255, nullable: true })
    phototwo: string | null

    @Column({ type: "varchar", length: 255, nullable: true })
    photothree: string | null

    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType: 'Point',
        srid: 4326,
        nullable: true,
    })
    location: Point | null

    @OneToOne(() => Location, location => location.prev, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn()
    next: Location | null

    @OneToOne(() => Location, location => location.next)
    prev: Location | null

    @Column({ type: "varchar", nullable: true })
    locationDescription: string

    @Column({ type: "timestamp", precision: 6, nullable: true })
    scanTime: Date | null

    @OneToOne(() => DestinationPartial, destinationPartial => destinationPartial.location)
    destinationPartial?: DestinationPartial

    @OneToOne(() => PasswordPartial, passwordPartial => passwordPartial.location)
    passwordPartial?: PasswordPartial

}
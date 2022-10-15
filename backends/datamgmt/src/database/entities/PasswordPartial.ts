import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, } from "typeorm";
import { Location } from "./Location";

@Entity()
export class PasswordPartial {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Location, location => location.passwordPartial, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn()
    location: Location | null

    @Column({ type: "varchar", nullable: false, length: 255 })
    message: string

}
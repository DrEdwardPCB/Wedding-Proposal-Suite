import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./Location";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: "varchar", length: 20, nullable: false })
    loginName: string

    @Column({ type: "varchar", length: 255, nullable: false })
    password: string

    @Column({ type: 'boolean', nullable: false, default: false })
    isCameraMan: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    isAdmin: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    isApp: boolean

    @OneToOne(() => Location, location => location.user)
    location?: Location

}
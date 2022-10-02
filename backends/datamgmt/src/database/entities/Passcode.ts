import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Passcode {
    @Column({
        primary: true,
        nullable: false,
        type: "varchar",
        length: 255
    })
    passcode: string
}
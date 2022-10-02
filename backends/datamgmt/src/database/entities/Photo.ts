import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    createdAt: Date

    @Column({ type: "varchar", nullable: false })
    photo: string

    @DeleteDateColumn()
    deletedAt: Date | null
}
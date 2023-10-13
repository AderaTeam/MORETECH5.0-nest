import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, JoinTable } from "typeorm"
import { Office } from "./office.entity"

@Entity()
export class OpenHours {

    @PrimaryColumn()
    @ManyToOne(() => Office, (office) => office.openHours)
    @JoinTable()
    office: number

    @PrimaryColumn(
        {
            nullable: false,
        }
    )
    days: string

    @Column(
        {
            nullable: true,
        }
    )
    hours: string
}

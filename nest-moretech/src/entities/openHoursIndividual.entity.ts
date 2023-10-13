import { Entity, Column, ManyToOne, PrimaryColumn, JoinTable } from "typeorm"
import { Office } from "./office.entity"

@Entity()
export class OpenHoursIndividual {

    @PrimaryColumn()
    @ManyToOne(() => Office, (office) => office.openHoursIndividual)
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

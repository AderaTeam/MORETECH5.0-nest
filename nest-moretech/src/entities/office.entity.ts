import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { OpenHours } from "./openHours.entity"
import { OpenHoursIndividual } from "./openHoursIndividual.entity"

@Entity()
export class Office {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    salePointName: string

    @Column(
        {
            nullable: false,
        }
    )
    address: string
    
    @OneToMany(() => OpenHours, (openHours) => openHours.office)
    openHours: OpenHours[]

    @OneToMany(() => OpenHoursIndividual, (openHoursIndividual) => openHoursIndividual.office)
    openHoursIndividual: OpenHoursIndividual[]

    @Column(
        {
            nullable: true,
        }
    )
    rko: string

    @Column(
        {
            nullable: true,
        }
    )
    officeType: string

    @Column(
        {
            nullable: true,
        }
    )
    salePointFormat: string

    @Column(
        {
            nullable: true,
        }
    )
    suoAvailability: string

    @Column(
        {
            nullable: true,
        }
    )
    hasRamp: string

    @Column(
        {
            nullable: true,
        }
    )
    latitude: string

    @Column(
        {
            nullable: true,
        }
    )
    longitude: string

    @Column(
        {
            nullable: true,
        }
    )
    metroStation: string

    @Column(
        {
            nullable: true,
        }
    )
    distance: string

    @Column(
        {
            nullable: true,
        }
    )
    kep: string

    @Column(
        {
            nullable: true,
        }
    )
    myBranch: string
}

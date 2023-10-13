import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity()
export class ATM {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    address: string

    @Column(
        {
            nullable: false,
        }
    )
    latitude: string

    @Column(
        {
            nullable: false,
        }
    )
    longitude: string

    @Column(
        {
            nullable: false,
        }
    )
    allDay: boolean

    @Column(
        {
            nullable: false,
        }
    )
    wheelchair: string
    @Column(
        {
            nullable: false,
        }
    )
    blind: string
    @Column(
        {
            nullable: false,
        }
    )
    nfcForBankCards: string
    @Column(
        {
            nullable: false,
        }
    )
    qrRead: string
    @Column(
        {
            nullable: false,
        }
    )
    supportsUsd: string
    @Column(
        {
            nullable: false,
        }
    )
    supportsChargeRub: string
    @Column(
        {
            nullable: false,
        }
    )
    supportsEur: string
    @Column(
        {
            nullable: false,
        }
    )
    supportsRub: string

}

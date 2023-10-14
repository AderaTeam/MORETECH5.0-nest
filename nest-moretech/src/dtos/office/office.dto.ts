import { OpenHours } from "src/entities/openHours.entity"
import { OpenHoursIndividual } from "src/entities/openHoursIndividual.entity"

export class OfficeDto
{
    id: number

    
    salePointName: string

    
    address: string
    
    openHours: OpenHours[]

    openHoursIndividual: OpenHoursIndividual[]

    
    rko: string

    
    officeType: string

    
    salePointFormat: string

    
    suoAvailability: string

    
    hasRamp: string

    
    latitude: number

    
    longitude: number

    
    metroStation: string

    
    distance: string

    
    kep: string

    
    myBranch: string
}
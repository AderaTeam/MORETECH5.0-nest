import { Controller, Get, Post, Query } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
    constructor(
        private dataService: DataService
    ){}

    @Post('offices')
    public async parseOffices()
    {
        return this.dataService.parseJsonOffices()
    }

    @Get('offices')
    public async getOfficesInRadius(@Query() query)
    {
        return await this.dataService.getAllOfficeDataInRadius(Number(query.latitude), Number(query.longitude))
    }

    @Get('alloffices')
    public async getOffices()
    {
        return await this.dataService.getAllOfficeData()
    }

    @Get('officeswithcriterias')
    public async getOfficesWithCriterias(@Query() query)
    {
        return await this.dataService.getAllOfficeDataWithCriteria(Number(query.latitude), Number(query.longitude), Boolean(query.hasRamp == 'true'),  Boolean(query.premium == 'true'), Boolean(query.callButton == 'true'))
    }

    @Post('atms')
    public async parseATMs()
    {
        return this.dataService.parseJsonAtms()
    }

    @Get('atms')
    public async getATMs()
    {
        return this.dataService.getAllATMsData()
    }

    @Get('individual')
    public async getIndividualJobs()
    {
        return this.dataService.getIndividualJobs()
    }

    @Get('organization')
    public async getOrganizationJobs()
    {
        return this.dataService.getOrganizationJobs()
    }
}

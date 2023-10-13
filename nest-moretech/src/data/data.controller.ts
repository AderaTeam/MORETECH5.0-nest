import { Controller, Get, Post } from '@nestjs/common';
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
    public async getOffices()
    {
        return this.dataService.getAllOfficeData()
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

import { Body, Controller, Post } from '@nestjs/common';
import { AdminDto } from 'src/dtos/admin/admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(
        private adminService: AdminService,
    ){}
    @Post('signup')
    public async signup(@Body() adminDto: AdminDto)
    {
        return await this.adminService.signup(adminDto);
    }

    @Post()
    public async signin(@Body() adminDto: AdminDto)
    {
        return await this.adminService.signin(adminDto);
    }
}

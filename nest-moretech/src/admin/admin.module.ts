import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { databaseProviders } from 'src/database.providers';

@Module({
    imports: [],
    controllers: [AdminController],
    providers: [AdminService, ...databaseProviders],
})
export class AdminModule {}

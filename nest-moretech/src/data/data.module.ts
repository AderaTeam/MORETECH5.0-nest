import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { databaseProviders } from 'src/database.providers';

@Module({
  controllers: [DataController],
  providers: [DataService, ...databaseProviders]
})
export class DataModule {}

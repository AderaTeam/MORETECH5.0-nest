import { Module } from '@nestjs/common'
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { databaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';
import { DataModule } from './data/data.module';

@Module({
  imports: [ConfigModule.forRoot(),
            AdminModule,
            DataModule],
  controllers: [],
  providers: [...databaseProviders],
})
export class AppModule {}

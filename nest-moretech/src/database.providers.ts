import { join } from 'path';
import { DataSource } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { Office } from './entities/office.entity';
import { OpenHours } from './entities/openHours.entity';
import { OpenHoursIndividual } from './entities/openHoursIndividual.entity';
import { ATM } from './entities/atm.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
  {
    provide: 'ADMIN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Admin),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'OFFICE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Office),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'OPENHOURS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OpenHours),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'OPENHOURSINDIVIDUAL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OpenHoursIndividual),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ATM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ATM),
    inject: ['DATA_SOURCE'],
  },
];

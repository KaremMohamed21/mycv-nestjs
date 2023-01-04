import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'mycv',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
})
export class AppModule {}

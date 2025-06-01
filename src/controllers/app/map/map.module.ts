import { Module } from '@nestjs/common';
import { AppMapService } from './map.service';
import { AppMapController } from './map.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User, Modules, PasswordReset, Person } from 'src/models';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Modules,
      PasswordReset,
      Person
    ]),
    HttpModule
  ],
  controllers: [
    AppMapController
  ],
  providers: [
    AppMapService
  ]
})
export class AppMapModule {}

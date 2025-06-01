import { Module } from '@nestjs/common';
import { AppAuthService } from './auth.service';
import { AppAuthController } from './auth.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User, Modules, PasswordReset, Person } from 'src/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Modules,
      PasswordReset,
      Person
    ])
  ],
  controllers: [
    AppAuthController
  ],
  providers: [
    AppAuthService
  ]
})
export class AppAuthModule {}

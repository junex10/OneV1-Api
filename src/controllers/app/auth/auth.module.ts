import { Module } from '@nestjs/common';
import { AppAuthService } from './auth.service';
import { AppAuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User, Modules, PasswordReset, Person, UsersCode } from 'src/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Modules,
      PasswordReset,
      Person,
      UsersCode,
    ]),
  ],
  controllers: [AppAuthController],
  providers: [AppAuthService],
})
export class AppAuthModule {}
